//TODO: Create Terraform Infrastructure for ECS --> cluster, task definition, service etc)
// Terrafor

//Reference existing ECR repository
data "aws_ecr_repository" "ecr" {
  name = var.ecr_repo_name
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

//Import aws existing ecs execution role 
data "aws_iam_role" "ecs_execution_role" {
  name = "ecsTaskExecutionRole"
}



//KMS key for CloudWatch Logs
resource "aws_kms_key" "cloudwatch_logs_key" {
  description             = "KMS key for CloudWatch Logs"
  enable_key_rotation     = true
  deletion_window_in_days = 7
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
          Sid = "Allow CloudWatch Logs to encrypt and decrypt"
          Effect = "Allow"
          Principal = {
            Service = "logs.amazonaws.com"
          }
          Action = [
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:ReEncrypt*",
            "kms:GenerateDataKey*",
            "kms:DescribeKey"
          ]
          Resource = "*"
          Condition = {
            ArnLike = {
              "kms:EncryptionContext:aws:logs:log-group" = "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:*"
            }
          }
      }
    ]
  })
}

// Cloudwatch log group for ECS tasks
resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "ecs-log-group"
  retention_in_days = 365
  kms_key_id        = aws_kms_key.cloudwatch_logs_key.arn
}



//ECS Cluster
resource "aws_ecs_cluster" "ecs-cluster" {
  name = "${var.project_name}-ecs-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }

}

//ECS Cluster capacity providers
resource "aws_ecs_cluster_capacity_providers" "ecs-capacity_provider" {
  cluster_name = aws_ecs_cluster.ecs-cluster.name

  capacity_providers = ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
}


//ECS Task definition
resource "aws_ecs_task_definition" "ecs-task-definition" {
  family                   = "${var.project_name}-ecs-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = data.aws_iam_role.ecs_execution_role.arn
  cpu                      = var.ecs_task_cpu
  memory                   = var.ecs_task_memory
  container_definitions = templatefile("${path.module}/container_definition.json.tpl", {
    container_name = "${var.project_name}-container-image"
    image_url      = data.aws_ecr_repository.ecr.repository_url
    cpu            = var.ecs_task_cpu
    memory         = var.ecs_task_memory
    ecs_log_group  = aws_cloudwatch_log_group.ecs_log_group.name
    logs_prefix    = aws_cloudwatch_log_group.ecs_log_group.name_prefix
  })
  runtime_platform {
    operating_system_family = var.operating_system_family
    cpu_architecture        = var.cpu_architecture
  }

}

//The security group for the ECS Service
resource "aws_security_group" "ecs_security_group" {
  #checkov:skip=CKV_AWS_382: Allowing egress to the internet (Testing purposes)
  name        = "${var.project_name}-ecs_sg"
  description = "The ECS service security group"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [var.alb_security_group]
    description     = "Allow all traffic from ALB security group"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.allowed_cidr_blocks
    description = "Allow all traffic to the internet"
  }
}


//ECS Service
resource "aws_ecs_service" "ecs-service" {
  name                 = "ecs-service"
  cluster              = aws_ecs_cluster.ecs-cluster.id
  launch_type          = "FARGATE"
  task_definition      = aws_ecs_task_definition.ecs-task-definition.arn
  desired_count        = 1
  force_new_deployment = true
  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "${var.project_name}-container-image"
    container_port   = 3000
  }

  network_configuration {
    subnets         = var.subnets
    security_groups = [aws_security_group.ecs_security_group.id]

  }
}



# VPC Endpoints for ECR/ECS
resource "aws_security_group" "endpoint_sg" {
  #checkov:skip=CKV_AWS_382: Allowing egress to the internet (Testing purposes)
  name        = "vpc-endpoint-sg"
  description = "Security group for VPC endpoints like ECR and SSM"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_security_group.id]
    description     = "Allow HTTPS traffic from the ALB"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all traffic to the internet"
  }
}

# ECR API endpoint
resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id             = var.vpc_id
  service_name       = "com.amazonaws.eu-west-2.ecr.api"
  vpc_endpoint_type  = "Interface"
  subnet_ids         = var.subnets
  security_group_ids = [aws_security_group.endpoint_sg.id]
}

# ECR DKR endpoint
resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id             = var.vpc_id
  service_name       = "com.amazonaws.eu-west-2.ecr.dkr"
  vpc_endpoint_type  = "Interface"
  subnet_ids         = var.subnets
  security_group_ids = [aws_security_group.endpoint_sg.id]
}



