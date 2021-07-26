# Create Application Load Balancer
# terraform aws create application load balancer
resource "aws_lb" "application-load-balancer" {
  name               = "EcsAlb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb-security-group.id]

  subnet_mapping {
    subnet_id = aws_subnet.public-subnet-1.id
  }

  subnet_mapping {
    subnet_id = aws_subnet.public-subnet-2.id
  }

  enable_deletion_protection = false

  tags   = {
    Name = "Application Load Balancer"
  }
}

# Create Target Group
# terraform aws create target group
resource "aws_lb_target_group" "alb-target-group" {
  name        = "MyEcsServer"
  target_type = "ip"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.vpc.id

  health_check {
    healthy_threshold   = 3
    interval            = 60
    matcher             = "200"
    path                = "/"
    protocol            = "HTTP"
    timeout             = 30
    unhealthy_threshold = 3
    port                = "traffic-port"
  }
}

## Redirect all traffic from the ALB to the target group
# terraform aws create listener
resource "aws_lb_listener" "alb-web-listener" {
  load_balancer_arn = aws_lb.application-load-balancer.arn
  port              = "8080"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb-target-group.arn
  }
}