terraform {
  required_version = "1.12.2"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.83.1"
    }
  }


}


// use aws configure to log into aws cli 
provider "aws" {
  # Configuration options
  region = "eu-west-2"
}
