//Output values goes here for the networking module


output "vpc_id" {
  value       = aws_vpc.vpc.id
  description = "The ID of the VPC"

}

output "public_subnets" {
  value       = aws_subnet.public_subnet[*].id
  description = "List of public subnet IDs"

}

output "private_subnets" {
  value       = aws_subnet.private_subnet[*].id
  description = "List of private subnet IDs"

}