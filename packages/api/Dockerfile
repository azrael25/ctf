FROM node:13.6

RUN mkdir /var/www

WORKDIR /var/www

COPY ./dist /var/www
COPY package.json /var/www
COPY yarn.lock /var/www

RUN yarn

ENV NODE_ENV production
ENV PORT 4000

EXPOSE 4000
CMD ["node", "/var/www/index.js"]
