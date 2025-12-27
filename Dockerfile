#Dockerfile
FROM node:20-alpine

#Create app directory
WORKDIR /app

#Install deps
COPY package*.json ./
RUN npm install --production

#Copy source
COPY . .

#Expose the port you want to expose
Expose 3000

#Start Command
CMD ["node","index.js"]
