FROM debian:stable-slim as builder
LABEL authors="yaon"

WORKDIR /app
COPY . /app

RUN apt update && apt install -y \
    openjdk-17-jdk\
    maven

RUN mvn clean package -P prod -DskipTests



FROM debian:stable-slim as runner
WORKDIR /app
COPY --from=builder /app /app
RUN apt update && apt install -y \
    openjdk-17-jre\
    maven
EXPOSE 8080

CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]