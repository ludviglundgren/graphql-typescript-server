FROM node:10.7.0

WORKDIR /app
ADD yarn.lock .
ADD package.json .

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]
