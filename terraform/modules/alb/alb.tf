# This module creates an Application Load Balancer (ALB) with a target group and listeners.
data "aws_acm_certificate" "issued" {
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true

}

# S3 Bucket for ALB access logs
resource "aws_s3_bucket" "alb_access_logs" {
  bucket = "alb-access-logs-bucket"
  tags = var.tags

}


# AWS Application Load Balancer (ALB) #
resource "aws_lb" "alb_main" {
  name               = var.alb_name
  load_balancer_type = "application"
  internal           = false
  subnets            = var.subnet_ids
  security_groups    = [aws_security_group.alb_sg.id]
  enable_deletion_protection = true
  access_logs {
    bucket  = aws_s3_bucket.alb_access_logs.bucket
    prefix  = "alb-access-logs"
    enabled = true
  }
  drop_invalid_header_fields = true

}

# Target Group for the application 
resource "aws_lb_target_group" "tg_app" {
  name        = "mvp-app-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = 3
    unhealthy_threshold = 2
    interval            = 20
    timeout             = 3
    protocol            = "HTTP"
    path                = var.health_check_path
    matcher             = "200"
  }

  tags = var.tags
}

# HTTP Listener: Redirects to HTTPS #
resource "aws_lb_listener" "listener_http" {
  load_balancer_arn = aws_lb.alb_main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener: Forwards traffic to Target Group #
resource "aws_alb_listener" "listener_https" {
  load_balancer_arn = aws_lb.alb_main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn = data.aws_acm_certificate.issued.arn



  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_app.arn
  }
}

# Security Group for ALB #
resource "aws_security_group" "alb_sg" {
  #checkov:skip=CKV_AWS_260: Allowing ingress from the internet (Testing purposes)
  #checkov:skip=CKV_AWS_382: Allowing egress to the internet (Testing purposes)
  name        = var.alb_name
  description = "Security group for ALB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP traffic from the internet"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS traffic from the internet"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all traffic to the internet"
  }

}
