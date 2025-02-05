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
- [Licensing](#licensing)

---

## **Overview**

This Terraform configuration sets up the necessary AWS resources to deploy and manage a containerized application (referred to as the "Threat Model") on **AWS ECS using Fargate**. The infrastructure includes:

- **VPC** and **subnets** for network isolation.
- **Security groups** to control access to the ECS service and load balancer.
- **ECS cluster** and **task definitions** to run the application.
- **Application Load Balancer (ALB)** to manage traffic routing.
- **ECR (Elastic Container Registry)** integration for container image storage.
- **IAM roles** and policies for secure operation.

The application is designed to be flexible and scalable, taking full advantage of AWS services for containerized applications.

---

## **Modules Structure**

The Terraform configuration is modularized into separate files and directories to keep the code clean and maintainable. The primary modules are:

1. **`vpc/`**:

   - Creates the **VPC**, **subnets**, **internet gateway**, and **route tables**.
   - Defines the network topology for your ECS infrastructure.

2. **`alb/`**:

   - Sets up the **Application Load Balancer (ALB)**.
   - Configures **security groups**, **listeners**, and **target groups** for routing HTTP/HTTPS traffic.

3. **`ecs/`**:

   - Defines the **ECS cluster**, **task definitions**, and **ECS service**.
   - Configures **Fargate** tasks with the containerized Threat Model application.
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

## **Usage**

### 1. Clone the Repository

Clone this repository to your local machine or remote system.

```bash
git clone <repository-url>
cd terraform-ecs-threat-model
```

### 2. Initialize Terraform

Run the following command to initialize the Terraform environment. This will download the necessary providers and initialize your workspace.

```bash
terraform init
```

### 3. Review and Configure Variables

Make sure to review and configure the `variables.tf` file or pass the necessary variables via `terraform.tfvars`. Key variables include:

- `azs` — Availability zones for subnets.
- `vpc_cidr` — CIDR block for your VPC.
- `public_subnet_cidrs` — CIDR blocks for public subnets.
- `allowed_cidr_blocks` — The CIDR blocks allowed to access the ECS service.
- `domain` — Your ACM domain for the load balancer SSL certificate.

You can create a `terraform.tfvars` file to specify your variable values:

```hcl
azs = ["us-west-2a", "us-west-2b"]
vpc_cidr = "10.0.0.0/16"
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
allowed_cidr_blocks = ["0.0.0.0/0"]
domain = "example.com"
```

### 4. Plan the Deployment

Before applying the changes, run `terraform plan` to preview what changes will be made to your AWS environment.

```bash
terraform plan
```

This command will display the execution plan, showing you the resources that will be created, modified, or destroyed.

### 5. Apply the Configuration

Once you're satisfied with the plan, apply the configuration to create the infrastructure.

```bash
terraform apply
```

Confirm the action when prompted by typing `yes`.

---

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
3. **ECS Cluster**: The `ecs/` module creates an ECS cluster using Fargate, which is then used to deploy the containerized application.
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
