output "spring_boot_api_role_name" {
  description = "Name of the Spring Boot API IAM role"
  value       = aws_iam_role.spring_boot_api.name
}

output "spring_boot_api_instance_profile_name" {
  description = "Name of the Spring Boot API instance profile"
  value       = aws_iam_instance_profile.spring_boot_api.name
}

output "nextjs_web_role_name" {
  description = "Name of the Next.js web IAM role"
  value       = aws_iam_role.nextjs_web.name
}

output "nextjs_web_instance_profile_name" {
  description = "Name of the Next.js web instance profile"
  value       = aws_iam_instance_profile.nextjs_web.name
}