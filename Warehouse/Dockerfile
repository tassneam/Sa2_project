# Use the official Maven image as a parent image
FROM maven:3.8.3-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# First, copy only the project files necessary for installing dependencies
COPY pom.xml .
# Uncomment this line if you have additional Maven configuration files
# COPY mvn.settings.xml .

# Install dependencies
RUN mvn -B dependency:go-offline

# Copy the rest of the project files and build the application
COPY src ./src
RUN mvn -B package -DskipTests

# Create a new image based on the adoptopenjdk image
FROM openjdk:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the previous stage to the new image
COPY --from=build /app/target/Warehouse-0.0.1-SNAPSHOT.jar ./app.jar

# Expose the port that the application runs on
EXPOSE 8082

# Command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]
