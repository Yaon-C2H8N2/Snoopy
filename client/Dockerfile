FROM node:alpine as builder
LABEL authors="yaon"

WORKDIR /app

COPY . /app

RUN npm install && npm run build

FROM nginx:alpine as runner
LABEL authors="yaon"

RUN ln -snf /usr/share/zoneinfo/"Europe/Paris" /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /var/www/html

COPY --from=builder /app/dist /var/www/html
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx"]

EXPOSE 80 443