FROM mhart/alpine-node:13.0
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 80
CMD [“npm”, “start”]