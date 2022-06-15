FROM node
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY index.js /usr/src/app/
COPY .env /usr/src/app/
EXPOSE 5000
EXPOSE 7687
CMD ["npm", "start"]