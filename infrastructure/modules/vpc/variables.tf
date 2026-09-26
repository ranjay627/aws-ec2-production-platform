variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)

  validation {
    condition     = length(var.public_subnet_cidrs) == 2
    error_message = "Exactly two public subnet CIDRs are required."
  }
}

variable "private_app_subnet_cidrs" {
  description = "CIDR blocks for private application subnets"
  type        = list(string)

  validation {
    condition     = length(var.private_app_subnet_cidrs) == 2
    error_message = "Exactly two private application subnet CIDRs are required."
  }
}

variable "database_subnet_cidrs" {
  description = "CIDR blocks for private database subnets"
  type        = list(string)

  validation {
    condition     = length(var.database_subnet_cidrs) == 2
    error_message = "Exactly two database subnet CIDRs are required."
  }
}