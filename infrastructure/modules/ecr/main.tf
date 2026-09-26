resource "aws_ecr_repository" "this" {
  name                 = "${var.project_name}-${var.environment}-${var.application_name}"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-${var.application_name}"
    Project     = var.project_name
    Environment = var.environment
    Application = var.application_name
    ManagedBy   = "Terraform"
  }
}