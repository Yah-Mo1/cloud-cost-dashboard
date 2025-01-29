## Requirements

| Name                                                   | Version |
| ------------------------------------------------------ | ------- |
| <a name="requirement_aws"></a> [aws](#requirement_aws) | 5.83.1  |

## Providers

No providers.

## Modules

| Name                                         | Source        | Version |
| -------------------------------------------- | ------------- | ------- |
| <a name="module_alb"></a> [alb](#module_alb) | ./modules/alb | n/a     |
| <a name="module_ecs"></a> [ecs](#module_ecs) | ./modules/ecs | n/a     |
| <a name="module_vpc"></a> [vpc](#module_vpc) | ./modules/vpc | n/a     |

## Resources

No resources.

## Inputs

| Name                                                | Description                                   | Type     | Default       | Required |
| --------------------------------------------------- | --------------------------------------------- | -------- | ------------- | :------: |
| <a name="input_region"></a> [region](#input_region) | The region where the resources are created in | `string` | `"us-east-1"` |    no    |

## Outputs

No outputs.

# Areas to improve on:

Reference modules in terraform root directory main.tf
Implement terratest
Configure ecs project using private subnets -> using nat gateways private route tables etc
create make file that has all terraform workflow instructions to deploy the architecture --. and reference in workflow using make command
