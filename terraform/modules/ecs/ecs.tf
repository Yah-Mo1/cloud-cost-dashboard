//TODO: Create Terraform Infrastructure for ECS --> cluster, task definition, service etc)



//Reference existing ECR
data "aws_ecr_repository" "ecr" {
  name = "ecs-project-repository"
}

//Import aws existing ecs execution role 
data "aws_iam_role" "ecs_execution_role" {
  name = "ecsTaskExecutionRole"
}


//ECS Cluster
resource "aws_ecs_cluster" "ecs-cluster" {
  name = "ecs-cluster"
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
//TODO: Ensure ecr repositry uri is being referenced correctly
resource "aws_ecs_task_definition" "ecs-task-definition" {
  family = "ecs-task-definition"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn = data.aws_iam_role.ecs_execution_role.arn
  cpu                      = 1024
  memory                   = 3072
  container_definitions = jsonencode([
    {
      name      = "ecs-container-image"
      image     = data.aws_ecr_repository.ecr.repository_url
      cpu                      = 1024
      memory                   = 3072
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    },
    
  ])
 runtime_platform {
  operating_system_family = var.operating_system_family
  cpu_architecture        = var.cpu_architecture
}

}

//The security group for the ECS Service
resource "aws_security_group" "ecs_security_group" {
  name        = "threatModel_ecs_security_group"
  description = "The ECS service security group"
  vpc_id      = var.vpc_id

  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    security_groups = [var.alb_security_group]  //changed from ecs sg id to alb sg id
    description      = "Allow all traffic from ALB security group"
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.allowed_cidr_blocks
  }
}


//ECS Service
//TODO: Remove ECS Security group block and instead use the load balancer Security group defined in the alb module
resource "aws_ecs_service" "ecs-service" {
  name            = "ecs-service"
  cluster         = aws_ecs_cluster.ecs-cluster.id
  launch_type = "FARGATE"
  task_definition = aws_ecs_task_definition.ecs-task-definition.arn
  desired_count   = 1
  force_new_deployment = true
  //TODO --> Work on this role 
  # iam_role        = aws_iam_role.foo.arn
  # depends_on      = [aws_iam_role_policy.foo]

    load_balancer {
    target_group_arn = var.target_group_arn  # Reference target group ARN from ALB module
    container_name   = "ecs-container-image"
    container_port   = 3000
  }

  network_configuration {
    subnets = var.subnets
    security_groups = [aws_security_group.ecs_security_group.id]  //changed from ecs sg id to alb sg id
    assign_public_ip = true    

  }

#  TODO IMPORTATNT Error: creating ECS Service (ecs-service): operation error ECS: CreateService, https response error StatusCode: 400, RequestID: 6bc75f57-e251-48d8-bd6f-e3b248cdeb9e, InvalidParameterException: Placement constraints are not supported with FARGATE launch type.
# │ 
# │   with module.ecs.aws_ecs_service.ecs-service,
# │   on modules/ecs/ecs.tf line 69, in resource "aws_ecs_service" "ecs-service":
# │   69: resource "aws_ecs_service" "ecs-service" {
//TODO REfine placement constraints to use your exact azs
  # placement_constraints {
  #   type       = "memberOf"
  #   expression = "attribute:ecs.availability-zone in [us-west-1a, us-west-1b]"
  # }
}
