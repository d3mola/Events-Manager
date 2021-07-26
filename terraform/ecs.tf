# Create Ecs Cluster
# terraform aws create ecs cluster
resource "aws_ecs_cluster" "web-cluster" {
  name                  = "events-manager"
  capacity_providers    = ["FARGATE"]
}

## Create Ecs Task Definition
# terraform aws create ecs task definition
resource "aws_ecs_task_definition" "task-definition" {
  family                    = "container-task"
  requires_compatibilities  = ["FARGATE"]
  execution_role_arn        = aws_iam_role.ecs_task_execution_role.arn
  network_mode              = "awsvpc"
  cpu                       = "1024"
  memory                    = "2048"
  container_definitions     = "${file("container-definition/container-def.json")}"
}

# Create Ecs service
# terraform aws create ecs service
resource "aws_ecs_service" "web-cluster" {
  name            = "web-service"
  cluster         = aws_ecs_cluster.web-cluster.id
  task_definition = aws_ecs_task_definition.task-definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.app-security-group.id]
    subnets          = [aws_subnet.public-subnet-1.id, aws_subnet.public-subnet-1.id]
    assign_public_ip = true
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.alb-target-group.arn
    container_name   = "events-manager"
    container_port   = 8080
  }
  depends_on  = [aws_lb_listener.alb-web-listener, aws_iam_role_policy_attachment.ecs_task_execution_role]
} 

resource "aws_cloudwatch_log_group" "events-manager_log_group" {
  name = "/ecs/events-manager"
    retention_in_days = 30

  tags = {
    Name = "log-group"
  }
}

resource "aws_cloudwatch_log_stream" "events-manager_log_stream" {
  name           = "log-stream"
  log_group_name = aws_cloudwatch_log_group.events-manager_log_group.name
}