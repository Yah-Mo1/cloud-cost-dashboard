#Required variables for all modules
variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "public_subnets" {
  description = "List of public subnet CIDRs"
  type        = list(string)
}

variable "private_subnets" {
  description = "List of private subnet CIDRs"
  type        = list(string)
}


variable "tags" {
  description = "Map of tags to apply to resources"
  type        = map(string)
}


//ALB

variable "alb_name" {
  description = "The alb name"
  type        = string

}

variable "domain_name" {
  description = "The base domain name for the hosted zone"
  type        = string

}


variable "record_name" {
  description = "The base domain name for the hosted zone"
  type        = string
}