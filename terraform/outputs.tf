//Root level outputs file   
output "alb_dns_name" {
  value = module.alb.alb_dns_name

}

output "record_name" {
  value = module.route53.record_name

}