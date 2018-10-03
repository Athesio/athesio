FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm i
EXPOSE 3000
CMD ["webpack && node server/index.js"]
