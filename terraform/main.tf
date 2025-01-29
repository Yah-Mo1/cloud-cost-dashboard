module "vpc" {
  source = "./modules/vpc"  
}

module "alb" {
  source     = "./modules/alb"
  vpc_id = module.vpc.vpc_id
  subnets = module.vpc.public_subnet_ids
#   azs = module.vpc.azs
}

module "ecs" {
  source = "./modules/ecs"
  subnets = module.vpc.public_subnet_ids
  alb_security_group = module.alb.alb_security_group_id
  target_group_arn = module.alb.target_group_arn
  vpc_id = module.vpc.vpc_id

}

module "route53" {
  source = "./modules/route53"
  alb_dns_name = module.alb.load_balancer_dns_name
  
}