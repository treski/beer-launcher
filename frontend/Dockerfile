# name the node stage "builder"
FROM node:16-slim as builder
# set working directory
WORKDIR /app
# add node_modules to PATH
ENV PATH /app/node_modules/.bin:$PATH
# copy all files from current directory to working dir in image
COPY . /app
# install node modules and build assets
RUN npm install && npm run build



# nginx state for serving content
FROM nginx:1.16.0-alpine
# copy from build the bundled app to the Nginx public directory
COPY --from=builder /app/build /usr/share/nginx/html
# expose port 80
EXPOSE 80
# containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]