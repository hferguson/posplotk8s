# Secrets
This directory has the following levels:
- all - secrets file that correspond to all environments (dev, prod, test)
- dev - for Dev environment only
- prod - for Production environment only

You need to create the following secrets either manually in kubectl or by adding a secrets yaml file to the appropriate directory.
For obvious reasons, I have not checked my secrets into github.

### in the all directory, create the following
- geoapi-secret.yaml
- jwt-secret.yaml

geo-api-secret contains one key called
GEOAPIKEY.  This is the client key for positionstack API

jwt-secret contains one key called JWT_SECRET
That secret should be a long random string. 64 or 128 bits - whatever you feel comfortable with
containing 0-9, A-Z, and a-f.

Here are the commands to create these using kubectl: 
`kubectl create secret generic geoapi-secret --from-literal=GEOAPIKEY=ABCD......`
and
`kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=SOME_REALLY_LONG_STRING...`

### in each of the dev and prod directories, create the following
- github-secret.yaml
It contains two keys
GITHUB_CLIENT_ID
GITHUB_SECRET

I created two OAuth authentication tokens - one for my dev sandbox, and one for my Digital Ocean environment

Here is the kubectl command:
`kubectl create secret generic github-secret --from-literal=GITHUB_CLIENT_ID=abcdef... --from-literal=GITHUB_CLIENT_SECRET=.....`
