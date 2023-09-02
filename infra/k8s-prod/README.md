# Notes on Production deployment
As per the Udemy Microservices course, you need to do a kubectl cmd to start up ingress-nginx.  Go to this page
for instructions on how to do this:
https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean

Ultimately, the command you need to run from Linux cmd line (after you set your kubectl context to point to your prod environment) is this:
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/do/deploy.yaml`
The above is specific to Digital Ocean.

