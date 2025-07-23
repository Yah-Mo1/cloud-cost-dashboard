// Production environment configuration

//Networking module values
environment        = "prod"
vpc_cidr           = "10.2.0.0/16"
availability_zones = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]
public_subnets     = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
private_subnets    = ["10.2.103.0/24", "10.2.104.0/24", "10.2.105.0/24"]
tags = {
  "environment" = "prod"
  "project"     = "threat-model-ops"
  "owner"       = "ops-team"
  "cost-center" = "security"
}

// ALB module values
alb_name    = "prod-alb"
domain_name = "tm-yahya.com"

// Route53 module values
record_name = "prod"

// ECR module values
ecr_repo_name = "ecs-project-repository"