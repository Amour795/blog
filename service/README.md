##### Docker打包命令
`docker build -t koa2 .`

##### docker 启动命令
`docker run -p 3000:3000 --env MONGODB=mongodb://172.17.0.2/blog --env  MONGONAME=root --env  MONGOPWD=Amour795 -d --name koa2  koa2`