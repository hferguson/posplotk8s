## Position API Microservice
This service is responsible for performing lookups against a GeoCoding service on the internet.
It takes requests for forward geocoding (for given address what are the co-ordinates) and reverse geocoding 
(here are the coordinates, what is the address you can find).

Currently using positionstack API (http://api.positionstack.com/) but could also use LocationIQ or
even Google (if you had the money).

Open items. Still trying to figure out how to mock the REST call inside the router services.