# **Terraform Infrastructure for Threat Model Application on ECS**

This repository contains the Terraform configuration to deploy the **Threat Model** application using **Amazon ECS (Elastic Container Service)**. The infrastructure includes VPC, subnets, security groups, ECS cluster, Fargate tasks, ALB (Application Load Balancer), and other related resources required for hosting and managing the application.

## **Table of Contents**

- [Overview](#overview)
- [Modules Structure](#modules-structure)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Module Inputs and Outputs](#module-inputs-and-outputs)
- [Deployment Workflow](#deployment-workflow)
- [Outputs](#outputs)

---

## **Overview**

This Terraform configuration sets up the necessary AWS resources to deploy and manage a containerised application (referred to as the "Threat Model") on **AWS ECS using Fargate**. The infrastructure includes:

- **VPC** and **subnets** for network isolation.
- **Security groups** to control access to the ECS service and load balancer.
- **ECS cluster** and **task definitions** to run the application.
- **Application Load Balancer (ALB)** to manage traffic routing.
- **ECR (Elastic Container Registry)** integration for container image storage.
- **IAM roles** and policies for secure operation.

The application is designed to be flexible and scalable, taking full advantage of AWS services for containerised applications.

---

## **Modules Structure**

The Terraform configuration is modularised into separate files and directories to keep the code clean and maintainable. The primary modules are:

1. **`vpc/`**:

   - Creates the **VPC**, **subnets**, **internet gateway**, and **route tables**.
   - Defines the network topology for your ECS infrastructure.

2. **`alb/`**:

   - Sets up the **Application Load Balancer (ALB)**.
   - Configures **security groups**, **listeners**, and **target groups** for routing HTTP/HTTPS traffic.

3. **`ecs/`**:

   - Defines the **ECS cluster**, **task definitions**, and **ECS service**.
   - Configures **Fargate** tasks with the containerised Threat Model application.
   - Integrates with the ALB for load balancing.

4. **`ecr/`** (optional depending on your setup):
   - Configures the **ECR repository** for storing the container image.

Each module is located in its respective directory with clearly defined inputs, outputs, and resources.

---

## **Prerequisites**

Before using this Terraform configuration, you need to have the following:

1. **AWS CLI** installed and configured with the appropriate access keys.

   For setup instructions, visit the official AWS CLI documentation: [AWS CLI Setup](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

2. **Terraform** installed (preferably version `0.14` or above).

   For installation instructions, visit the official Terraform website: [Install Terraform](https://www.terraform.io/downloads.html).

3. **IAM Role**: Ensure your AWS user has the necessary IAM permissions for creating and managing ECS, VPC, and other AWS resources. Recommended policies:

   - `AdministratorAccess`
   - `AmazonECS_FullAccess`
   - `AmazonVPC_FullAccess`
   - `IAMFullAccess` (if IAM roles are being created)

4. **ECR Repository**: If you're storing your container images in AWS ECR, ensure you have a repository created or create one via Terraform.

---

# Infrastructure Setup Guide

This guide explains how to set up your infrastructure using this Terraform configuration and modules.

---

## 1. Clone the Repository

Clone this repository to your local machine or remote system.

```bash
git clone <repository-url>
cd terraform
```

## 2. Select or Create a Terraform Workspace

Terraform workspaces help manage multiple environments (e.g. `dev`, `stage`, `prod`) using the same configuration.

List existing workspaces:

```bash
terraform workspace list
```

Create a new workspace (if it does not exist):

```bash
terraform workspace new dev
```

Or select an existing workspace:

```bash
terraform workspace select dev
```

Replace `dev` with `stage` or `prod` as appropriate.

---

## 3. Initialise Terraform

Run the following command to initialise the Terraform environment. This will download the necessary providers and set up your workspace.

```bash
terraform init
```

---

## 4. Review and Configure Variables

Each environment has its own `.tfvars` file in the `environments/` directory:

- `environments/dev.tfvars`
- `environments/stage.tfvars`
- `environments/prod.tfvars`

Example variables defined in these files:

```hcl
azs = ["us-west-2a", "us-west-2b"]
vpc_cidr = "10.0.0.0/16"
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
allowed_cidr_blocks = ["0.0.0.0/0"]
domain = "example.com"
```

Review and update these files as needed before planning or applying changes.

---

## 5. Plan the Deployment

Run `terraform plan`, specifying the relevant environment file:

```bash
terraform plan -var-file=environments/dev.tfvars
```

Replace `dev.tfvars` with the appropriate file for your environment.

This command previews the changes that will be applied to your AWS environment.

---

## 6. Apply the Configuration

Apply the plan to build or update your infrastructure:

```bash
terraform apply -var-file=environments/dev.tfvars
```

Confirm the action when prompted by typing `yes`.

---

## Notes

✅ **Best practice:** Commit your `*.tf` files but do **not** commit `.tfstate` or `.tfvars` files containing secrets (unless they are intended to be shared and contain no sensitive data). Use a remote backend (e.g. S3 + DynamoDB) for state storage in production.

✅ **Workspace + tfvars:** The workspace and `tfvars` file should always correspond to the environment you are targeting to avoid accidental changes.

---

## Example Commands Cheat Sheet

```bash
# List workspaces
terraform workspace list

# Create a new workspace
terraform workspace new dev

# Select a workspace
terraform workspace select dev

# Plan with a specific tfvars file
terraform plan -var-file=environments/dev.tfvars

# Apply with a specific tfvars file
terraform apply -var-file=environments/dev.tfvars
```

## **Module Inputs and Outputs**

### **vpc/ Module**

- **Inputs**:
  - `azs`: List of availability zones for the VPC.
  - `vpc_cidr`: CIDR block for the VPC.
  - `public_subnet_cidrs`: List of CIDR blocks for public subnets.
- **Outputs**:
  - `vpc_id`: The ID of the created VPC.
  - `subnet_ids`: The list of subnet IDs.
  - `azs`: The list of availability zones used.

### **alb/ Module**

- **Inputs**:
  - `subnet-azs`: Availability zones used for ALB subnets.
  - `allowed_cidr_blocks`: CIDR blocks allowed to access the ALB.
  - `domain`: Domain name for SSL certificates.
- **Outputs**:
  - `alb_security_group_id`: Security group ID for the ALB.
  - `target_group_arn`: ARN of the created target group for ECS services.

### **ecs/ Module**

- **Inputs**:
  - `subnet_ids`: Subnet IDs for ECS tasks.
  - `allowed_cidr_blocks`: CIDR blocks allowed to access ECS services.
  - `image`: The container image to be used in the ECS task.
  - `container_name`: Name of the container in the ECS task.
- **Outputs**:
  - `ecs_cluster_id`: The ECS cluster ID.
  - `ecs_service_id`: The ECS service ID.

### **ecr/ (Optional) Module**

- **Inputs**:
  - `repository_name`: Name of the ECR repository.
- **Outputs**:
  - `repository_url`: URL of the ECR repository.

---

## **Deployment Workflow**

The workflow for deploying the Threat Model application is as follows:

1. **Provision VPC**: The `vpc/` module creates a custom VPC, subnets, and route tables with internet access.
2. **Set up Load Balancer**: The `alb/` module provisions an Application Load Balancer (ALB), including security groups, listeners, and target groups.
3. **ECS Cluster**: The `ecs/` module creates an ECS cluster using Fargate, which is then used to deploy the containerised application.
4. **Container Deployment**: The container image (from ECR or a Docker registry) is deployed to ECS as part of the ECS task definition and service.
5. **Routing Traffic**: Traffic is routed through the ALB to the ECS service based on the container ports defined.

---

## **Outputs**

Once the Terraform configuration is applied, the following outputs will be available:

- `alb_url`: The URL of the ALB (used to access the Threat Model application).
- `ecs_cluster_id`: ECS Cluster ID.
- `ecs_service_id`: ECS Service ID.
- `vpc_id`: The ID of the VPC created.
- `subnet_ids`: List of subnet IDs used for ECS services.

---
