## Position Plot Project
This is a revival of the posplot project I wrote a while ago (https://github.com/hferguson/posplotter/). This time it will be rewritten to work as a series of microservices that 
all work with Kubernetes and can be deployed to a K8S cluster.
The original project was set up as a reporting database.  I've made it a lot more generic for this project.
You basically just plot waypoints on a map and save to a MongoDB database.  The idea is that this 
can be taken away and used to build something more elaborate, but really the point of the project is to 
have a demo project for practising Kubernetes deployments in a cloud vendor's environment.

List of required secrets - the following need to be added to Kubernetes

Name                    secret
GITHUB_CLIENT_ID        github-secret
GITHUB_CLIENT_SECRET    github-secret
GEOAPIKEY                geoapi-secret
JWT_SECRET               jwt-secret
to add these
kubectl create secret generic geoapi-secret --from-literal=GEOAPIKEY=ABCD......

kubectl create secret generic github-secret --from-literal=GITHUB_CLIENT_ID=abcdef... --from-literal=GITHUB_CLIENT_SECRET=.....

kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=SOME_REALLY_LONG_STRING...


