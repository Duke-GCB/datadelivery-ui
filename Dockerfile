FROM node:8 as builder

WORKDIR /src
ADD . /src
RUN npm install
RUN npm run build -- --environment production

FROM nginx:1.13
COPY --from=builder /src/dist /usr/share/nginx/html
