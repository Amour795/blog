FROM node:12
WORKDIR /app
COPY package*.json ./
COPY . .
ENV MONGODB="mongodb://172.17.0.2/smile-db"
ENV MONGONAME="admin"
ENV MONGOPWD="admin"
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD ["npm","start"]