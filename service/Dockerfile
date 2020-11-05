FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
ENV MONGODB=''
ENV MONGONAME=""
ENV MONGOPWD=""
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD ["npm","start"]