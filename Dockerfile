FROM node:9.9

RUN mkdir -p /app

ADD * app/

WORKDIR /app

RUN  npm install

EXPOSE 3000

CMD ["node", "app"]