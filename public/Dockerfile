FROM node:alpine
WORKDIR /usr/src/app/public
COPY package.json /usr/src/app/public/
RUN npm install
COPY . /usr/src/app/public/
EXPOSE 3000
EXPOSE 5000
CMD ["npm", "start"]