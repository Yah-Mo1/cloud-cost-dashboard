//Creating VPC so we can store ecs service within it

# VPC
resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
     name = "ecs-vpc"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnets" {
  count                   = 2
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = element(var.azs, count.index)
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet ${count.index + 1}"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
}

# Public Route Tables
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

#Public route table association to the public subnet
resource "aws_route_table_association" "public_rt_asso" {
  count          = 2
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

# Private Subnets
# resource "aws_subnet" "private_subnets" {
#   count             = 2
#   vpc_id            = aws_vpc.vpc.id
#   cidr_block        = var.private_subnet_cidrs[count.index]
#   availability_zone = element(var.azs, count.index)
# }




# Private Route table
# resource "aws_route_table" "private_route_table" {
#   vpc_id = aws_vpc.vpc.id

#   count = 2
#   route {
#     cidr_block     = "0.0.0.0/0"
#     nat_gateway_id = aws_nat_gateway.natgateway[count.index].id
#   }
# }

# resource "aws_route_table_association" "private_rt_asso" {
#   count          = 2
#   subnet_id      = element(aws_subnet.private_subnets[*].id, count.index)
#   route_table_id = aws_route_table.private_route_table[count.index].id
# }

# resource "aws_eip" "eip_natgw" {
#   count = 2
# }

# resource "aws_nat_gateway" "natgateway" {
#   count         = 2
#   allocation_id = aws_eip.eip_natgw[count.index].id
#   subnet_id     = aws_subnet.public_subnets[count.index].id
# }





