# Dockerfile för backend + mqtt
FROM node:18

WORKDIR /app

COPY . .

RUN npm install


CMD ["node", "server.js"]
#CMD ["npm", "run", "dev"]
# eller för att testa MQTT separat:
# CMD ["npm", "run", "mqtt"]