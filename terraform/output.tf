############################################################
# # Output for Application Load Balancer                                      #
############################################################

## Application Load Balancer DNS Name
output "application-load-balancer-dns-name" {
  value     = aws_lb.application-load-balancer.dns_name 
}