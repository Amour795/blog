FROM node:12
WORKDIR /app
COPY package*.json ./
COPY . .
ENV MONGODB=''
ENV MONGONAME=""
ENV MONGOPWD=""
RUN npm install
EXPOSE 3000
CMD ["npm","start"]