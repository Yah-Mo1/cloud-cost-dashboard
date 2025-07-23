# This module creates an Application Load Balancer (ALB) with a target group and listeners.

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}
data "aws_acm_certificate" "issued" {
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true

}

#KMS Key for ALB access logs
resource "aws_kms_key" "alb_access_logs_key" {
  description             = "KMS key for ALB access logs"
  enable_key_rotation     = true
  deletion_window_in_days = 7


  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "default",
  "Statement": [
    {
      "Sid": "DefaultAllow",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/awsUser"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "AllowELBLogDelivery",
      "Effect": "Allow",
      "Principal": {
        "Service": "logdelivery.elasticloadbalancing.amazonaws.com"
      },
      "Action": [
        "kms:Encrypt",
        "kms:GenerateDataKey*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowS3UseOfTheKey",
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": [
        "kms:Decrypt",
        "kms:Encrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowSNSServiceUse",
      "Effect": "Allow",
      "Principal": {
        "Service": "sns.amazonaws.com"
      },
      "Action": [
        "kms:Decrypt",
        "kms:Encrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    }
  ]
}
POLICY

  tags = var.tags
}

# S3 Bucket for ALB access logs
resource "aws_s3_bucket" "alb_access_logs" {
  bucket        = "alb-access-logs-bucket-123123142134"
  tags          = var.tags
  force_destroy = true

}

#S3 Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "alb_access_logs_public_access_block" {
  bucket                  = aws_s3_bucket.alb_access_logs.id
  ignore_public_acls      = true
  restrict_public_buckets = true

  block_public_acls   = true
  block_public_policy = true
}
#S3 Bucket Lifecycle Configuration
resource "aws_s3_bucket_lifecycle_configuration" "alb_access_logs_lifecycle" {
  bucket = aws_s3_bucket.alb_access_logs.id

  rule {

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
    id     = "expire"
    status = "Enabled"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    expiration {
      days = 90
    }
  }

}
#S3 Bucket Server Side Encryption Configuration
#  resource "aws_s3_bucket_server_side_encryption_configuration" "good_sse_1" {
#    bucket = aws_s3_bucket.alb_access_logs.bucket

#   rule {
#     apply_server_side_encryption_by_default {
#        kms_master_key_id = aws_kms_key.alb_access_logs_key.arn
#       sse_algorithm     = "aws:kms"
#      }
#    }
#  }

#S3 Bucket Versioning
resource "aws_s3_bucket_versioning" "versioning_example" {
  bucket = aws_s3_bucket.alb_access_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}
# S3 Bucket Policy for ALB access logs
resource "aws_s3_bucket_policy" "alb_access_logs_policy" {
  bucket = aws_s3_bucket.alb_access_logs.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "logdelivery.elasticloadbalancing.amazonaws.com"
        }
        Action = [
          "s3:PutObject"
        ]
        Resource = "${aws_s3_bucket.alb_access_logs.arn}/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      },
      {
        Effect = "Allow"
        Principal = {
          Service = "logdelivery.elasticloadbalancing.amazonaws.com"
        }
        Action = [
          "s3:GetBucketAcl"
        ]
        Resource = aws_s3_bucket.alb_access_logs.arn
      }
    ]
  })
}

#SNS Topic for ALB access logs
resource "aws_sns_topic" "s3_sns_topic" {
  name              = "s3-sns-topic"
  kms_master_key_id = aws_kms_key.alb_access_logs_key.arn
}

# SNS Topic Policy to allow S3 to publish messages
resource "aws_sns_topic_policy" "s3_sns_topic_policy" {
  arn = aws_sns_topic.s3_sns_topic.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "s3.amazonaws.com"
        }
        Action = [
          "sns:Publish"
        ]
        Resource = aws_sns_topic.s3_sns_topic.arn
        Condition = {
          StringEquals = {
            "aws:SourceArn" = aws_s3_bucket.alb_access_logs.arn
          }
        }
      }
    ]
  })
}

#S3 Bucket Notification for ALB access logs
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.alb_access_logs.id

  topic {
    topic_arn     = aws_sns_topic.s3_sns_topic.arn
    events        = ["s3:ObjectCreated:*"]
    filter_prefix = "logs/"
  }
  depends_on = [aws_sns_topic_policy.s3_sns_topic_policy]
}


# AWS Application Load Balancer (ALB) #
resource "aws_lb" "alb_main" {
  name               = var.alb_name
  load_balancer_type = "application"
  internal           = false
  subnets            = var.subnet_ids
  security_groups    = [aws_security_group.alb_sg.id]
  # enable_deletion_protection = true
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
      host        = "#{host}"
      path        = "/#{path}"
      port        = "443"
      protocol    = "HTTPS"
      query       = "#{query}"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener: Forwards traffic to Target Group #
resource "aws_alb_listener" "listener_https" {
  load_balancer_arn = aws_lb.alb_main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = data.aws_acm_certificate.issued.arn



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
