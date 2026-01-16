# Estágio de Build
FROM maven:3.8.4-openjdk-17 AS build
# Define a pasta de trabalho para evitar erros de caminho
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Estágio de Execução (Usando uma imagem estável e recomendada)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copia o jar gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx512m", "-Dserver.port=${PORT:10000}", "-jar", "app.jar"]