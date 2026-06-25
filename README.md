                       # 🚀 AWS DevOps Portfolio — Node.js App on AWS

**Arlex | Cloud & DevOps Engineer**
[![GitHub](https://img.shields.io/badge/GitHub-arlex-dev-181717?logo=github)](https://github.com/arlex-dev)

---

## 📐 Architecture Overview

This project demonstrates a full DevOps workflow: a containerized Node.js application deployed to AWS infrastructure provisioned entirely with Terraform, with automated CI/CD via GitHub Actions.

```
┌─────────────────────────────────────────────────────┐
│                   GitHub Actions                     │
│   Push to main → Build → Docker → Terraform Deploy  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                     AWS Cloud                        │
│                                                      │
│   ┌─────────────┐        ┌──────────────────────┐   │
│   │   S3 Bucket │        │   DynamoDB Table      │   │
│   │ (tfstate)   │◄──────►│  (state lock)         │   │
│   └─────────────┘        └──────────────────────┘   │
│                                                      │
│   ┌─────────────────────────────────────────────┐   │
│   │               Custom VPC                     │   │
│   │                                              │   │
│   │   ┌──────────────────────────────────────┐  │   │
│   │   │          Public Subnet               │  │   │
│   │   │                                      │  │   │
│   │   │   ┌──────────────────────────────┐   │  │   │
│   │   │   │  EC2 Instance                │   │  │   │
│   │   │   │  └─ Docker Container         │   │  │   │
│   │   │   │     └─ Node.js App           │   │  │   │
│   │   │   └──────────────────────────────┘   │  │   │
│   │   │              ▲                        │  │   │
│   │   └──────────────┼────────────────────────┘  │   │
│   │                  │                            │   │
│   │   ┌──────────────────────────────────────┐  │   │
│   │   │       Security Group                  │  │   │
│   │   │       Port 80 (HTTP) — open           │  │   │
│   │   │       Port 22 (SSH)  — restricted     │  │   │
│   │   └──────────────────────────────────────┘  │   │
│   └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Cloud Provider** | AWS (EC2, S3, VPC, Security Groups, DynamoDB) |
| **Infrastructure as Code** | Terraform (remote state + DynamoDB locking) |
| **Containerization** | Docker |
| **CI/CD** | GitHub Actions |
| **Application** | Node.js |
| **Version Control** | Git / GitHub |

---

## 📁 Project Structure

```
aws-devops-portfolio/
│
├── app/
│   ├── src/
│   │   └── index.js          # Node.js application
│   ├── package.json
│   └── Dockerfile            # Container definition
│
├── terraform/
│   ├── main.tf               # EC2, VPC, Security Groups
│   ├── variables.tf          # Input variables
│   ├── outputs.tf            # Output values
│   └── backend.tf            # S3 remote state + DynamoDB lock
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
│
└── README.md
```

---

## ⚙️ Infrastructure Details

### Remote State Management
Terraform state is stored remotely in an **S3 bucket** with state locking enabled via **DynamoDB**. This prevents concurrent state modifications and enables team collaboration.

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "devops-portfolio/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

### VPC & Networking
- Custom VPC with public subnet
- Internet Gateway for public access
- Security Group: HTTP (80) open, SSH (22) restricted to trusted IPs

### EC2 Instance
- Amazon Linux 2 AMI
- Docker installed via user data script
- Node.js app runs as a Docker container on port 80

---

## 🔁 CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow:

1. **Checkout** — pull latest code
2. **Setup Node.js** — install dependencies
3. **Build Docker image** — containerize the app
4. **Configure AWS credentials** — via GitHub Secrets
5. **Terraform init + apply** — provision/update infrastructure
6. **Deploy** — container runs on EC2

---

## 🚀 How to Deploy

### Prerequisites
- AWS account with IAM credentials
- Terraform installed (`>= 1.0`)
- Docker installed
- GitHub repository with the following secrets set:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/arlex-dev/aws-devops-portfolio.git
cd aws-devops-portfolio

# 2. Initialize Terraform
cd terraform
terraform init

# 3. Preview infrastructure changes
terraform plan

# 4. Deploy infrastructure
terraform apply

# 5. Build and run the app locally (optional)
cd ../app
docker build -t node-app .
docker run -p 3000:3000 node-app
```

---

## 🔐 Security Notes

- AWS credentials are stored as **GitHub Secrets**, never hardcoded
- Terraform state is **encrypted at rest** in S3
- Security Groups follow **least privilege** principle
- SSH access is restricted to specific IP ranges

---

## 📚 What I Learned

- Provisioning production-grade AWS infrastructure with Terraform
- Managing Terraform remote state with S3 backend and DynamoDB locking
- Containerizing Node.js applications with Docker
- Building automated CI/CD pipelines with GitHub Actions
- Networking fundamentals: VPC, subnets, security groups, IGW

---

## 👤 About

**Arlex** — Cloud & DevOps Engineer  
B.S. Information Technology — Northern Kentucky University (Dec 2024)  
GitHub: [github.com/arlex-dev](https://github.com/arlex-dev)
