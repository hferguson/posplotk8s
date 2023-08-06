# Healthmon service
This is a very primitive health monitor.  It uses Express and axios. Each service that needs to be checked creates a route like
/api/servicename/healthcheck, and this healthcheck URL and others are listed in an environment variable (in the healthmon-depl.yaml).
I intended only the most primitive of health checks for this project just to have the bare bones implementation.  
I did think about implementing the healthmon as a RabbitMQ but decided that was overkill. 
