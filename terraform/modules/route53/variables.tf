//Variables for the Route53 module

variable "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  type        = string
}

variable "alb_zone_id" {
  description = "The hosted zone ID for the ALB"
  type        = string

}
variable "record_type" {
  description = "The type of DNS record to create (A or CNAME)"
  type        = string
  default     = "A"
  validation {
    condition     = contains(["A", "CNAME"], var.record_type)
    error_message = "The record_type must be either 'A' or 'CNAME'"
  }
}

variable "record_name" {
  description = "The name of the DNS record to create"
  type        = string

}

variable "domain_name" {
  description = "The base domain name for the hosted zone"
  type        = string

}