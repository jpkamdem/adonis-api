FROM node:23

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN chmod +x ./script.sh

EXPOSE 3333

RUN node ace build

COPY ./.env ./build

ENTRYPOINT [ "./script.sh" ]