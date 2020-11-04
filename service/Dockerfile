FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV MONGODB="mongodb://172.17.0.2/smile-db"
ENV MONGONAME="admin"
ENV MONGOPWD="admin"


RUN npm install

EXPOSE 3000
CMD ["npm","start"]