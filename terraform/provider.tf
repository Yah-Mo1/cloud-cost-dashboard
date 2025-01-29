terraform {
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
  region     = var.region
  access_key = ""
  secret_key = ""
}

//TODO: REMEMBER TO REMOVE YOUR SECRET AND ACCESS KEY FROM HERE
//TODO: aws configure with access key and secret key of awsUser account