FROM node:8 as builder
WORKDIR /src
ADD package.json /src/package.json
ADD package-lock.json /src/package-lock.json
RUN npm install
RUN npm install phantomjs-prebuilt
ADD . /src/
RUN npm test
RUN npm run build -- --environment production

FROM nginx:1.13
WORKDIR /app
COPY --from=builder /src/dist /app
# Overwrite the nginx default.conf with our site
COPY nginx-conf/default.conf  /etc/nginx/conf.d/default.conf
