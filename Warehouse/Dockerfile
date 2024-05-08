# Use the official Maven image as a parent image
FROM maven:3.8.3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app

COPY --from=build /app/target/Warehouse-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8082

CMD ["java", "-jar", "app.jar"]
