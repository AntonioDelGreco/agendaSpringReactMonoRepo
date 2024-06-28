# Etapa 1: Construcción de la aplicación frontend React con Vite
FROM node:14 as build
WORKDIR /app
COPY src/main/frontend/package*.json ./
RUN npm install
COPY src/main/frontend/ ./
RUN npm run build

# Etapa 2: Construcción de la aplicación Spring Boot
FROM openjdk:21-jdk-slim
ARG JAR_FILE=target/go-back-0.0.1.jar

# Copia el archivo JAR de la aplicación Spring Boot
COPY ${JAR_FILE} app_go.jar

# Copia los archivos estáticos de React a la carpeta `static` de Spring Boot
COPY --from=build /app/dist /static

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_go.jar"]
