//output values for the route53 module
# output "hosted_zone_id" {
#   description = "The ID of the Route 53 hosted zone"
#   value       = aws_route53_zone.this.zone_id
# }

output "record_name" {
  description = "The name of the DNS record created"
  value       = var.record_name
}

