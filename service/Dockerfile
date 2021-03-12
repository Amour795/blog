FROM node:12
WORKDIR /app
COPY package*.json ./
COPY . .
ENV MONGODB='172.17.0.3:27017'
ENV MONGONAME="Amour795"
ENV MONGOPWD="Amour795"
RUN npm install
EXPOSE 3000
CMD ["npm","start"]