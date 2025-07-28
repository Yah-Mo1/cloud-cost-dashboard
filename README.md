# 📊 **Cloud Cost Dashboard - Deployment Infrastructure**

---

## 📝 **Introduction**

**Cloud Cost Dashboard** is a cloud-native solution that automates the deployment of a comprehensive cloud cost monitoring and reporting application using **AWS**, **Docker**, **Terraform**, and **CI/CD pipelines**. This project streamlines infrastructure management, ensuring deployments are **secure**, **scalable**, and **efficient**. The application is securely hosted on **AWS** with a custom subdomain managed through **Amazon Route 53**.

The application is a **React-based cloud cost monitoring dashboard** that provides interactive visualisations of AWS service spending patterns, with comprehensive filtering, reporting, and export capabilities.

---

## 📊 **Architecture Diagram**

The following diagram illustrates the high-level architecture of the Cloud Cost Dashboard deployment:

![Cloud Cost Dashboard Architecture](images/architecture-diagram.png)

---

## ✨ **Key Features**

### 📊 **Cloud Cost Dashboard Application**

- **Interactive Dashboard**: Real-time visualisation of AWS service costs with filtering
- **Detailed Reports**: Comprehensive cost breakdown with export functionality
- **Multiple Chart Types**: Pie charts, bar charts, trend analysis, and daily spend tracking
- **Multi-Currency Support**: Configurable currency display preferences
- **Data Export**: CSV/PDF export capabilities for cost reports
- **Responsive Design**: Mobile-optimised interface with dark/light theme support

### 🚀 **Infrastructure Automation**

- **Terraform Workspaces**: Environment isolation (dev/staging/prod) with separate state management
- **Modular Architecture**: Clean separation of networking, compute, security, and DNS components
- **ECS Fargate**: Serverless container orchestration with ARM64 architecture for cost optimisation
- **Auto-Scaling**: CPU and Memory based scaling policies with configurable limits
- **Multi-AZ Deployment**: High availability across multiple availability zones

### 🔐 **Security & Compliance**

- **KMS Encryption**: Customer-managed keys for all logs and sensitive data
- **VPC Flow Logs**: Network traffic monitoring with encrypted CloudWatch integration
- **Security Groups**: Least-privilege access with ALB-to-ECS traffic isolation
- **S3 Security**: Public access blocking, versioning, and intelligent lifecycle policies
- **Checkov Scanning**: Infrastructure security compliance validation in CI/CD

### 📈 **Monitoring & Observability**

- **Container Insights**: ECS cluster and service performance monitoring
- **Centralised Logging**: Application logs, VPC Flow Logs, and ALB access logs
- **CloudWatch Integration**: Comprehensive metrics, alarms, and log retention (365 days)
- **SNS Notifications**: Real-time alerts for infrastructure events and log changes
- **Health Checks**: Application and infrastructure health monitoring with auto-recovery

---

## 🛠️ **Technology Stack**

### **Frontend Application**

- **React 18** with TypeScript and modern hooks
- **Vite** for fast builds and hot module replacement
- **shadcn/ui** + **Tailwind CSS** for modern, accessible UI components
- **React Query** for state management and data fetching
- **React Router** for client-side routing
- **Recharts** for interactive data visualisations
- **Lucide React** for consistent iconography

### **AWS Infrastructure**

- **ECS Fargate** - Serverless container orchestration
- **ECR** - Private container registry
- **Application Load Balancer** - Layer 7 load balancing with SSL/TLS
- **VPC** - Isolated network with public/private subnets
- **Route 53** - DNS management and domain routing
- **CloudWatch** - Comprehensive monitoring and logging
- **KMS** - Customer-managed encryption keys
- **S3** - Secure storage for ALB access logs
- **Auto Scaling** - Dynamic scaling based on utilisation metrics

### **DevOps & Infrastructure**

- **Terraform** - Infrastructure as Code with modular architecture
- **GitHub Actions** - CI/CD automation with security scanning
- **Docker** - Multi-stage builds with security optimisations
- **Checkov** - Infrastructure security and compliance scanning

---

## 🚀 **Getting Started**

### ✅ **Prerequisites**

- **AWS Account** with appropriate IAM permissions
- **Terraform** (v1.3.0+) installed locally
- **Docker** for containerisation
- **Node.js** (v18+) for local development
- **AWS CLI** configured with credentials
- **GitHub account** for CI/CD integration

---

### 🏗️ **Deployment Instructions**

#### **1️⃣ Clone the Repository**

```bash
# Clone the repository
git clone <repo-url>
cd cloud-cost-dashboard
```

---

#### **2️⃣ Local Development**

```bash
# Navigate to application directory
cd app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

#### **3️⃣ Container Deployment**

```bash
# Build Docker image
cd app
docker build -t cloud-cost-dashboard .

# Push to ECR (after authentication)
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.eu-west-2.amazonaws.com
docker tag cloud-cost-dashboard:latest <account-id>.dkr.ecr.eu-west-2.amazonaws.com/ecs-project-repository:latest
docker push <account-id>.dkr.ecr.eu-west-2.amazonaws.com/ecs-project-repository:latest
```

---

#### **4️⃣ Infrastructure Deployment with Terraform Workspaces**

🚀 **Multi-Environment Management with Terraform Workspaces**

This project implements **Terraform Workspaces** for robust environment isolation and management. Each environment (dev, staging, prod) maintains separate state files and configurations, ensuring complete isolation between deployments.

**Environment Structure:**

```
terraform/environments/
├── dev/dev.terraform.tfvars          # Development environment
├── staging/staging.terraform.tfvars  # Staging environment
└── prod/prod.terraform.tfvars        # Production environment
```

**Deployment Workflow:**

```bash
cd terraform

# Initialise Terraform
terraform init

# Format and validate configuration
terraform fmt
terraform validate

# Create and select workspace
terraform workspace new dev    # Creates new workspace for dev environment
# OR switch to existing workspace
terraform workspace select dev

# Plan infrastructure changes
terraform plan -var-file=./environments/dev/dev.terraform.tfvars

# Deploy infrastructure
terraform apply -var-file=./environments/dev/dev.terraform.tfvars

# List and manage workspaces
terraform workspace list        # Show all workspaces
terraform workspace show       # Show current workspace
```

🔧 **Workspace Benefits:**

- ✅ **State Isolation:** Each environment has separate Terraform state
- ✅ **Resource Separation:** No risk of accidentally modifying wrong environment
- ✅ **Parallel Deployments:** Deploy to multiple environments simultaneously
- ✅ **Environment-Specific Configurations:** Tailored settings per environment

✅ **Provisions the following infrastructure:**

- 🌐 **VPC** with public/private subnets across multiple AZs
- 📦 **ECS Fargate Cluster** with Container Insights enabled
- 🔒 **Application Load Balancer** with SSL/TLS termination
- 🗺️ **Route 53** DNS records for application access
- 📊 **CloudWatch Log Groups** with KMS encryption
- 🛡️ **Auto-Scaling Policies** for CPU and Memory utilisation

---

#### **5️⃣ Configure CI/CD Pipelines**

GitHub Actions are set up for **build, deployment**, and **destruction** workflows.

##### 📦 **CI Workflow (Build & Push to ECR)**

Located at: `.github/workflows/CI-workflow.yml`

- Builds Docker images and pushes them to ECR
- Ensures images are up-to-date on code changes

##### 🚀 **Plan & Apply Workflow (Deploy Infrastructure)**

Located at: `.github/workflows/tfplan.yml`

- Formats the terraform infrastructure scripts
- Tests for security vulnerabilities with Checkov
- Creates an execution plan of the infrastructure that will be deployed to AWS

##### 🚀 **Deploy Workflow (Deploy Infrastructure)**

Located at: `.github/workflows/tfapply.yml`

- Deploys Terraform-managed infrastructure to AWS
- Requires GitHub secrets for AWS credentials

##### 🗑️ **Destroy Workflow (Clean Up Resources)**

Located at: `.github/workflows/tfdestroy.yml`

- Tears down infrastructure when no longer needed

---

#### **6️⃣ Access the Application**

After deployment:

1. Navigate to **Route 53** and find your hosted zone
2. Copy the configured **domain name**
3. Open it in your browser to access the Cloud Cost Dashboard via HTTPS 🌐

---

## 🔄 **CI/CD Workflows**

### **Available Workflows**

- **`CI-workflow.yml`** - Build and push Docker images to ECR
- **`tfplan.yml`** - Terraform planning with security scanning and formatting checks
- **`tfapply.yml`** - Deploy infrastructure to specified environment
- **`tfdestroy.yml`** - Clean up infrastructure resources

### **Workflow Features**

- **Security Scanning**: Checkov compliance validation
- **Multi-Environment**: Support for dev, staging, and production deployments
- **Manual Triggers**: Workflow dispatch for controlled deployments
- **Error Handling**: Comprehensive error checking and rollback capabilities

---

## 🔒 **Security Implementation**

### **Infrastructure Security**

- **Network Isolation**: Private subnets for application tier
- **Encryption at Rest**: KMS encryption for all log data
- **Encryption in Transit**: HTTPS/TLS for all communications
- **Access Control**: IAM roles with minimal required permissions
- **Flow Logging**: VPC network traffic monitoring

### **Security Considerations**

- 🛡️ **HTTPS Enabled:** All communications are secured via ALB and ACM certificates
- 🔑 **IAM Policies:** Resources use the principle of least privilege
- 📊 **Monitoring:** CloudWatch logs and metrics are enabled for infrastructure components
- 🚫 **Security Groups:** Only necessary ports (80, 443, 3000) are open, with ingress restricted to trusted CIDR blocks

---

### **Completed Features** ✅

- ✅ Multi-environment Terraform workspaces
- ✅ ECS Fargate with auto-scaling
- ✅ Comprehensive KMS encryption
- ✅ VPC Flow Logs and monitoring
- ✅ CI/CD with security scanning
- ✅ Modern React application with TypeScript

---

## 🏆 **Project Highlights**

This project demonstrates **enterprise-grade DevOps practices** including:

- **Infrastructure as Code** with modular, reusable Terraform configurations
- **Container orchestration** with serverless ECS Fargate deployment
- **Security-first architecture** with comprehensive encryption and monitoring
- **Production readiness** with multi-environment support

---

## 🖼️ **Visual Reference**

![Cloud Cost Dashboard Application](images/app.png)

---
