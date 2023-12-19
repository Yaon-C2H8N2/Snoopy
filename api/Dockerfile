FROM debian:stable-slim
LABEL authors="yaon"

RUN apt update && apt install -y \
    openjdk-17-jdk\
    maven

COPY . /app
WORKDIR /app

RUN mvn clean

EXPOSE 8080

CMD ["mvn", "spring-boot:run", "-P", "prod"]