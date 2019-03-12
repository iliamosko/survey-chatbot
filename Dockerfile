FROM maven:3.6.0
COPY . /usr/app
WORKDIR /usr/app
RUN mvn package
EXPOSE 8080
RUN chmod +x target/*.jar
CMD ["java", "-jar", "./target/chatBot-0.0.1-SNAPSHOT.jar", "--ibm.assistant.apiKey=${WATSON_API_KEY}"]