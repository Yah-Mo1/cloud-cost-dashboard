output "load_balancer_arn" {
  value = aws_lb.ecs_alb.arn
}

output "load_balancer_dns_name" {
    value = aws_lb.ecs_alb.dns_name
}

output "alb_security_group_id" {
  value = aws_security_group.alb_security_group.id
}

output "target_group_arn" {
  value = aws_lb_target_group.ecs_tg.arn
  
}