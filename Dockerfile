FROM circleci/node:8.9-browsers as builder
# The base image sets USER to circleci.
# Reset user back to root so we have permissions for the ADDed files.
USER root
WORKDIR /src
ADD package.json /src/package.json
ADD package-lock.json /src/package-lock.json
RUN npm install
ADD . /src/

# add CI flag so chrome --no-sandbox flag will be used
RUN CI=true npm test
RUN npm run build -- --environment production

FROM nginx:1.13
WORKDIR /app
COPY --from=builder /src/dist /app
# Overwrite the nginx default.conf with our site
COPY nginx-conf/default.conf  /etc/nginx/conf.d/default.conf
