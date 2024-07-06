
FROM node:latest as angular
ARG IP_API
ARG API_HOST
ARG API_PORT

ENV ENV_IP_API=${IP_API}
ENV ENV_API_HOST=${API_HOST}
ENV ENV_API_PORT=${API_PORT}

WORKDIR /home/app
COPY package*.json .
RUN npm ci
COPY . .
RUN if [ -f Enviroment.ts ]; then rm Enviroment.ts; fi
RUN echo "Archivo Environment.ts eliminado (si existía)"

RUN echo "export const Enviroment = { \
  BACKEND_URL : 'http://${ENV_IP_API}:${ENV_API_PORT}}/', \
  BACKEND_API_URL : 'http://${ENV_IP_API}:${ENV_API_PORT}/api/', \
  CHAT_WS : 'ws://${ENV_IP_API}:${ENV_API_PORT}/WebChat' \
};" > Enviroment.ts

RUN echo "Archivo environment.ts creado con variables de entorno"
RUN chmod 777 Enviroment.ts

RUN npm run build -- --configuration=production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=angular /home/app/dist/frontend_tfg/browser .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R +rx *
EXPOSE 80
# CMD [ "tail", "-f", "/dev/null" ]
