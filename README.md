## Position Plot Project
This is a revival of the posplot project I wrote a while ago (https://github.com/hferguson/posplotter/). This time it will be rewritten to work as a series of microservices that 
all work with Kubernetes and can be deployed to a K8S cluster.
The original project was set up as a reporting database.  I've made it a lot more generic for this project.
You basically just plot waypoints on a map and save to a MongoDB database.  The idea is that this 
can be taken away and used to build something more elaborate, but really the point of the project is to 
have a demo project for practising Kubernetes deployments in a cloud vendor's environment.
