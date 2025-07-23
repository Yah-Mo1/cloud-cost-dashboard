//Root Configuration Main File where modules are called

module "networking" {
  source             = "./modules/networking"
  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  private_subnets    = var.private_subnets
  public_subnets     = var.public_subnets
  tags               = var.tags
}

module "alb" {
  source      = "./modules/alb"
  subnet_ids  = module.networking.public_subnets
  alb_name    = var.alb_name
  vpc_id      = module.networking.vpc_id
  domain_name = var.domain_name
  tags        = var.tags
}

module "ecs" {
  source             = "./modules/ecs"
  subnets            = module.networking.private_subnets
  vpc_id             = module.networking.vpc_id
  alb_security_group = module.alb.alb_security_group
  target_group_arn   = module.alb.target_group_arn
  ecr_repo_name      = var.ecr_repo_name

}

module "autoscaling" {
  source           = "./modules/autoscaling"
  ecs_cluster_name = module.ecs.ecs_cluster_name
  ecs_service_name = module.ecs.ecs_service_name
}

module "route53" {
  source       = "./modules/route53"
  record_name  = var.record_name
  alb_dns_name = module.alb.alb_dns_name
  domain_name  = var.domain_name
  alb_zone_id  = module.alb.alb_zone_id

}