FROM node:8 as builder

WORKDIR /src
ADD package.json /src/package.json
# ADD package-lock.json /src/package-lock.json
RUN npm install
ADD . /src/
RUN npm run build -- --environment production

FROM nginx:1.13
COPY --from=builder /src/dist /usr/share/nginx/html
