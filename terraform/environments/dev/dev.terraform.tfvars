// Development environment configuration

//Networking module values
environment        = "dev"
vpc_cidr           = "10.0.0.0/16"
availability_zones = ["eu-west-2a", "eu-west-2b"]
public_subnets     = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnets    = ["10.0.103.0/24", "10.0.104.0/24"]
tags = {
  "environment" = "dev"
  "project"     = "threat-model-ops"
  "owner"       = "dev-team"
}

// ALB module values
alb_name    = "dev-alb"
domain_name = "tm-yahya.com"

// Route53 module values
record_name = "dev"

// ECR module values
ecr_repo_name = "ecs-project-repository"