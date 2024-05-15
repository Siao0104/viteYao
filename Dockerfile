FROM node:21.7.1-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm install vue-router
RUN npm install element-plus
RUN npm install bootstrap@v5.3.3
RUN npm install vuex@next
RUN npm install axios

COPY . ./

EXPOSE 5173

CMD ["npm","run", "dev"]