//ALB --> Application load balancer
//question: im working on creating security groups in terraform, how can i reference this ?
//Should i just create security groups in the terminal and reference using data block ?

// or alternatively just create the security group as youre creating the alb

// ACM Certificate
data "aws_acm_certificate" "issued" {
  domain   = var.domain
  statuses = ["ISSUED"]
}

resource "aws_security_group" "alb_security_group" {
  name        = "threatModel_alb_security_group"
  description = "Threat Model load balancer security group"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

    ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.allowed_cidr_blocks
  }

  
}

//Application load balancer
resource "aws_lb" "ecs_alb" {
 name               = var.alb_name
 internal           = false
 load_balancer_type = "application"
 security_groups    = [aws_security_group.alb_security_group.id]
 subnets = var.subnets
 enable_deletion_protection = false


 tags = {
   Name = var.alb_name
 }

}

//HTTP listener
resource "aws_lb_listener" "ecs_alb_http_listener" {
 load_balancer_arn = aws_lb.ecs_alb.arn
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

//HTTPS listener
resource "aws_lb_listener" "ecs_alb_https_listener" {
 load_balancer_arn = aws_lb.ecs_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  
  //Add ACM resource using data block 
  certificate_arn = data.aws_acm_certificate.issued.arn

  default_action {
    type             = "forward"
   target_group_arn = aws_lb_target_group.ecs_tg.arn
  }

  depends_on = [aws_lb.ecs_alb, aws_lb_target_group.ecs_tg]

}

resource "aws_lb_target_group" "ecs_tg" {
 name        = var.target-group-name
 port        = 80
 protocol    = "HTTP"
 target_type = "ip"
 vpc_id      = var.vpc_id

 health_check {
   path = "/"
 }

}
resource "aws_lb_target_group_attachment" "ecs-tg-group-attachment" {
  target_group_arn = aws_lb_target_group.ecs_tg.arn
  target_id        = "10.0.1.2"
  port             = 3000
}
