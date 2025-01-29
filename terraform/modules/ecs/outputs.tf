# Output ECS Cluster Name
output "ecs_cluster_name" {
  value = aws_ecs_cluster.ecs-cluster.name
  description = "The name of the ECS cluster"
}

# Output ECS Service Name
output "ecs_service_name" {
  value = aws_ecs_service.ecs-service.name
  description = "The name of the ECS service"
}

# Output ECS Task Definition ARN
output "ecs_task_definition_arn" {
  value = aws_ecs_task_definition.ecs-task-definition.arn
  description = "The ARN of the ECS task definition"
}

# Output ECS Service ARN
output "ecs_service_arn" {
  value = aws_ecs_service.ecs-service.id
  description = "The ARN of the ECS service"
}

# Output ECS Cluster ARN
output "ecs_cluster_arn" {
  value = aws_ecs_cluster.ecs-cluster.arn
  description = "The ARN of the ECS cluster"
}