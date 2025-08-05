FROM node:22

WORKDIR /usr/src/app

COPY . .

RUN chmod +x ./entrypoint.sh
RUN npm install

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start:dev"]
