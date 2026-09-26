

resource "aws_iam_role" "spring_boot_api" {
  name = "${var.project_name}-${var.environment}-spring-boot-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-spring-boot-api-role"
    Project     = var.project_name
    Environment = var.environment
    Application = "spring-boot-api"
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_instance_profile" "spring_boot_api" {
  name = "${var.project_name}-${var.environment}-spring-boot-api-profile"
  role = aws_iam_role.spring_boot_api.name

  tags = {
    Name        = "${var.project_name}-${var.environment}-spring-boot-api-profile"
    Project     = var.project_name
    Environment = var.environment
    Application = "spring-boot-api"
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_role_policy" "spring_boot_api_ecr" {
  name = "${var.project_name}-${var.environment}-spring-boot-api-ecr"
  role = aws_iam_role.spring_boot_api.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer"
        ]

        Resource = var.spring_boot_api_repository_arn
      },
      {
        Effect = "Allow"

        Action = [
          "ecr:GetAuthorizationToken"
        ]

        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role" "nextjs_web" {
  name = "${var.project_name}-${var.environment}-nextjs-web-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-nextjs-web-role"
    Project     = var.project_name
    Environment = var.environment
    Application = "nextjs-web"
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_instance_profile" "nextjs_web" {
  name = "${var.project_name}-${var.environment}-nextjs-web-profile"
  role = aws_iam_role.nextjs_web.name

  tags = {
    Name        = "${var.project_name}-${var.environment}-nextjs-web-profile"
    Project     = var.project_name
    Environment = var.environment
    Application = "nextjs-web"
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_role_policy" "nextjs_web_ecr" {
  name = "${var.project_name}-${var.environment}-nextjs-web-ecr"
  role = aws_iam_role.nextjs_web.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer"
        ]

        Resource = var.nextjs_web_repository_arn
      },
      {
        Effect = "Allow"

        Action = [
          "ecr:GetAuthorizationToken"
        ]

        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "spring_boot_api_ssm" {
  role       = aws_iam_role.spring_boot_api.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "nextjs_web_ssm" {
  role       = aws_iam_role.nextjs_web.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}