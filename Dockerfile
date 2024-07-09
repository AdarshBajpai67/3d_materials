FROM node:18.3.0

WORKDIR /usr/dexterous_assign

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]