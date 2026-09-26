variable "aws_region" {
  description = "AWS region where the Terraform state infrastructure is created"
  type        = string
}

variable "state_bucket_name" {
  description = "Globally unique S3 bucket name used for Terraform state"
  type        = string
}