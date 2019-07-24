FROM node:8 as builder
WORKDIR /src
ADD package.json /src/package.json
ADD package-lock.json /src/package-lock.json
RUN npm install
# Install latest chrome package so we can run tests
# Copied from https://github.com/GoogleChromeLabs/lighthousebot/blob/master/builder/Dockerfile
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb
ADD . /src/

# add CI flag so chrome --no-sandbox flag will be used
RUN CI=true npm test
RUN npm run build -- --environment production

FROM nginx:1.13
WORKDIR /app
COPY --from=builder /src/dist /app
# Overwrite the nginx default.conf with our site
COPY nginx-conf/default.conf  /etc/nginx/conf.d/default.conf
