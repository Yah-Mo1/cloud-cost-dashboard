variable "alb_name" {
    description = "The name of the application load balancer"
    default = "threatModelALB"
    type = string
}

variable "target-group-name" {
    description = "The name of the target group"
    default = "threatModel-ecs-target-group-tg"
    type = string
  
}

variable "allowed_cidr_blocks" {
    description = "CIDR blocks allowed for the security groups"
    default = ["0.0.0.0/0"]
}

variable "subnets" {
    description = "The subnets for the Load balancer"
  
}
variable "domain" {
    description = "The ACM Certificate Domain"
    default = "*.tm-yahya.com"
  
}

variable "vpc_id" {
    description = "The ID of the VPC"
  
}