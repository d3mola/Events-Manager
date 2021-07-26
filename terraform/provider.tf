## Configured AWS Provider with Proper Credentials
# terraform aws provider
provider "aws" {
  region    = "us-east-1"
  profile   = "Terraform-user"
}