FROM eclipse-temurin:21-jre

WORKDIR /app

COPY distribution/WolfTechGlobal.jar app.jar

EXPOSE 10000

CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-10000} --server.address=0.0.0.0"]