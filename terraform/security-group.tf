# Create Security Group for the Application Load Balancer
## terraform aws create security group
resource "aws_security_group" "alb-security-group" {
  name        = "ALB Security Group"
  description = "controls access to the ALB"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description      = "HTTP Access"
    from_port        = 8080
    to_port          = 8080
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags   = {
    Name = "ALB Security Group"
  }
}

# Traffic to the ECS cluster should only come from the ALB
# terraform aws create security group
resource "aws_security_group" "app-security-group" {
  name        = "app Security Group"
  description = "Enable app access on all Port "
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description      = "Http Access"
    from_port        = 8080
    to_port          = 8080
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags   = {
    Name = "app Security Group"
  }
}