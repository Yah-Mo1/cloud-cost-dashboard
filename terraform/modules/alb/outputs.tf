
output "alb_dns_name" {
  value       = aws_lb.alb_main.dns_name
  description = "Public DNS name of the ALB"
}

output "alb_security_group" {
  value       = aws_security_group.alb_sg.id
  description = "Security group ID for the ALB"
}

output "target_group_arn" {
  value       = aws_lb_target_group.tg_app.arn
  description = "ARN of the target group for the ALB"
}

output "alb_zone_id" {
  value       = aws_lb.alb_main.zone_id
  description = "The hosted zone ID for the ALB"
}


output "cert_arn" {
  value = data.aws_acm_certificate.issued.arn
}