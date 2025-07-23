// Staging environment configuration

//Networking module values
environment        = "staging"
vpc_cidr           = "10.1.0.0/16"
availability_zones = ["eu-west-2a", "eu-west-2b"]
public_subnets     = ["10.1.1.0/24", "10.1.2.0/24"]
private_subnets    = ["10.1.103.0/24", "10.1.104.0/24"]
tags = {
  "environment" = "staging"
  "project"     = "threat-model-ops"
  "owner"       = "qa-team"
}

// ALB module values
alb_name    = "staging-alb"
domain_name = "tm-yahya.com"

// Route53 module values
record_name = "staging"

// ECR module values
ecr_repo_name = "ecs-project-repository"