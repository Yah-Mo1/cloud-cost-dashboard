data "aws_route53_zone" "rt53-hosted-zone" {
  name = var.hosted_zone
}


resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.rt53-hosted-zone.id
  name    = var.record_name
  type    = "CNAME"
  ttl     = 300
  records        = [var.alb_dns_name]
}