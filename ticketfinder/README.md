# Spring Boot Rest Service
to run mysql and spring boot with docker: 
- `cd ..`
- `docker compose up --build`

to stop:
- `docker compose down`

to run spring boot service only: 
- `mvn package`
- `java -jar target/ticketfinder-0.0.1-SNAPSHOT.jar`

API documentation can be accessed at http://localhost:8080/swagger-ui/index.html once spring boot service is up