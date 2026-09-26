# ---------------------------------------------------------
# ALB Security Group
# ---------------------------------------------------------

resource "aws_security_group" "alb" {
  name        = "${var.project_name}-${var.environment}-alb-sg"
  description = "Security group for the Application Load Balancer"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from the internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from the internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-alb-sg"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Tier        = "public"
  }
}

# ---------------------------------------------------------
# Next.js Security Group
# ---------------------------------------------------------

resource "aws_security_group" "nextjs_web" {
  name        = "${var.project_name}-${var.environment}-nextjs-web-sg"
  description = "Security group for private Next.js web instances"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Next.js traffic from the ALB"
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-nextjs-web-sg"
    Project     = var.project_name
    Environment = var.environment
    Application = "nextjs-web"
    ManagedBy   = "Terraform"
    Tier        = "private-app"
  }
}

# ---------------------------------------------------------
# Spring Boot API Security Group
# ---------------------------------------------------------

resource "aws_security_group" "spring_boot_api" {
  name        = "${var.project_name}-${var.environment}-spring-boot-api-sg"
  description = "Security group for private Spring Boot API instances"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Spring Boot API traffic from the ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-spring-boot-api-sg"
    Project     = var.project_name
    Environment = var.environment
    Application = "spring-boot-api"
    ManagedBy   = "Terraform"
    Tier        = "private-app"
  }
}

# ---------------------------------------------------------
# RDS Security Group
# ---------------------------------------------------------

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-${var.environment}-rds-sg"
  description = "Security group for private PostgreSQL RDS"
  vpc_id      = var.vpc_id

  ingress {
    description     = "PostgreSQL from the Spring Boot API"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.spring_boot_api.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-rds-sg"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Tier        = "database"
  }
}