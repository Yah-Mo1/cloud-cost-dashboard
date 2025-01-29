variable "vpc_cidr" {
    description = "The CIDR block of the VPC"
    default = "10.0.0.0/16"
  
}

variable "public_subnet_cidrs" {
  description = "The CIDR block of the Public subnet"
  type = list(string)
  default = [ "10.0.0.0/20", "10.0.16.0/20" ]
  
}

variable "private_subnet_cidrs" {
  description = "The CIDR block of the Private subnet"
  type = list(string)
  default = [ "10.0.128.0/20", "10.0.144.0/20" ]
  
}

variable "azs" {
    description = "The Availability zones where the subnets reside in"
    default = ["us-east-1a", "us-east-1b"]
  
}


# variable "region" {
#   description = "The region where the resources are created in"
#   default = "us-east-1"
# }