variable "hosted_zone" {
    description = "The name of the hosted zone"
    default = "tm-yahya.com"
    type = string
  
}

variable "record_name" {
    description = "The name of the hosted zone"
    default = "ecs.tm-yahya.com"
    type = string
  
}

variable "alb_dns_name" {
    description = "The DNS Name for the ALB"
  
}