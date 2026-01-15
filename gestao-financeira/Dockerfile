# Estágio de Build
FROM maven:3.8.4-openjdk-17 AS build
# Define a pasta de trabalho dentro do container
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Estágio de Execução (Usando uma imagem estável e atualizada)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]