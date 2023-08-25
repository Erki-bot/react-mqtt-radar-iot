FROM node:16-alpine
COPY package*.json ./
RUN yarn install && yarn global add serve
EXPOSE 3000
COPY . .
RUN yarn build
CMD ["serve", "-s" , "./build" , "-l" , "3000"]