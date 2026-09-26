variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "spring_boot_api_repository_arn" {
  description = "ARN of the Spring Boot API ECR repository"
  type        = string
}

variable "nextjs_web_repository_arn" {
  description = "ARN of the Next.js web ECR repository"
  type        = string
}