[
  {
    "name": "${container_name}",
    "image": "${image_url}:v1.0.0",
    "cpu": ${cpu},
    "memory": ${memory},
    "essential": true,
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${ecs_log_group}",
        "awslogs-region": "eu-west-2",
        "awslogs-stream-prefix": "${logs_prefix}"
      }
    }
  }
]
