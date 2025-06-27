
terraform {
  backend "s3" {
    bucket       = "statefile-backend-s3-bucket"
    key          = "threatModel/terraform.tfstate" //needs changing in cicd
    region       = "us-east-1"
    use_lockfile = true

  }
}