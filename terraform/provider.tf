terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.83.1"
    }
  }
}


// use aws configure to log into aws cli 
provider "aws" {
  # Configuration options
}