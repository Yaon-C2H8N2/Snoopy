FROM debian:stable-slim as builder
LABEL authors="yaon"

RUN apt update && apt install -y \
    openjdk-17-jdk\
    maven

WORKDIR /app
COPY . /app

RUN mvn clean package -P prod -DskipTests

FROM debian:stable-slim as runner

RUN apt update && apt install -y \
    openjdk-17-jre\
    maven

WORKDIR /app
COPY --from=builder /app /app

EXPOSE 8080

CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]