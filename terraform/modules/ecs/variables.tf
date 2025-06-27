variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "codercooks"

}


variable "ecr_repo_name" {
  description = "The name of the ECR repository"
  default     = "coderco-app"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed for the security groups"
  default     = ["0.0.0.0/0"]
  type        = list(string)
}


variable "ecs_task_cpu" {
  description = "CPU units for ECS task"
  type        = number
  default     = 1024
}

variable "ecs_task_memory" {
  description = "Memory (in MiB) for ECS task"
  type        = number
  default     = 3072
}
variable "operating_system_family" {
  description = "The operating system family"
  type        = string
  default     = "LINUX"
}

variable "cpu_architecture" {
  description = "The CPU architecture"
  type        = string
  default     = "ARM64"
}

variable "subnets" {
  description = "The subnets for the Load balancer"
  type        = list(string)

}

variable "alb_security_group" {
  description = "The security group of the Load Balancer"
  type        = string

}

variable "target_group_arn" {
  description = "The target group for the load balancer and ECS Service"
  type        = string

}

variable "vpc_id" {
  description = "The VPC for the ECS Security group"
  type        = string

}