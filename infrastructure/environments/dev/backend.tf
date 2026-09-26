terraform {
  backend "s3" {
    bucket       = "aws-ec2-production-platform-tfstate-20260926-01"
    key          = "environments/dev/terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
  }
}