# Infrastructure folder
This is where all the YAML files go for K8S deployment.  
## k8s directory
This is common infrastructure, i.e. deployment/service files for the microservices

## k8s-dev directory
This is infrastructure only deployed in minikube on local dev server. For example nginx
runs differently in PROD and in DEV so has different YAML files for each.

## k8s-prod directory
This is infrastructure only deployed in production. It includes production nginx config with 
the correct domain name, as well as Digital Ociean/Lets Encrypt-specific YAML files to 
request and deploy an SSL certificate for my domain.
