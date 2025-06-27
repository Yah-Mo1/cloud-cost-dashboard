variable "environment" {
  description = "Deployment enviroment"
  type        = string

}

variable "vpc_cidr" {
  description = "CIDR block for the vpc"
  type        = string


}


variable "availability_zones" {
  description = "lis of azs"
  type        = list(string)


}

variable "public_subnets" {
  type        = list(string)
  description = "list of publics subnets"

}
variable "private_subnets" {
  type        = list(string)
  description = "list of private subnet"


}


# variable "enable_nat_gateway" {
#   description = "to create NAT Gateway(s) for private subnet internet access"
#   type        = bool

# }
variable "tags" {
  description = "to Map tags to apply to resources"
  type        = map(string)

}
# variable "enable_vpn_gateway" {
#   description = "to create a VPN Gateway"
#   type        = bool

# }
