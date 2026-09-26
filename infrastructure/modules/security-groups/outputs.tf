output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "nextjs_web_security_group_id" {
  description = "ID of the Next.js web security group"
  value       = aws_security_group.nextjs_web.id
}

output "spring_boot_api_security_group_id" {
  description = "ID of the Spring Boot API security group"
  value       = aws_security_group.spring_boot_api.id
}

output "rds_security_group_id" {
  description = "ID of the RDS security group"
  value       = aws_security_group.rds.id
}