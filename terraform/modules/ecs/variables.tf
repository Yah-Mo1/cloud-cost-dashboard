variable "ecr_repo_name" {
    description = "The name of the ECR repository"
    default = "ecs-project-repository"
}

variable "allowed_cidr_blocks" {
    description = "CIDR blocks allowed for the security groups"
    default = ["0.0.0.0/0"]
}


variable "operating_system_family" {
  description = "The operating system family"
  type        = string
  default     = "LINUX"
}

variable "cpu_architecture" {
  description = "The CPU architecture"
  type        = string
  default     = "X86_64"  //change from arm64 to x86 as i was having error with task earlier
}

variable "subnets" {
    description = "The subnets for the Load balancer"
  
}

variable "alb_security_group" {
  description = "The security group of the Load Balancer"
  
}

variable "target_group_arn" {
  description = "The target group for the load balancer and ECS Service"
  
}

variable "vpc_id" {
  description = "The VPC for the ECS Security group"
  
}