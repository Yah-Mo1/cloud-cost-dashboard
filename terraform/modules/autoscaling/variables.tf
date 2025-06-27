

variable "ecs_cluster" {
  description = "The name of the ECS cluster"
}

variable "ecs_service" {
  description = "The name of the ECS service"
}


variable "max_capacity" {
  description = "The maximum number of instances to scale up to"
  type        = number
  default     = 5
}

variable "min_capacity" {
  description = "The minimum number of instances to scale down to"
  type        = number
  default     = 1
}

# variable "target_value" {
#     description = "The target value for the scaling policy"
#     type = number
#     default = 75
# }
