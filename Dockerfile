
FROM node:latest as angular

ARG IP_FRONT
ENV ENV_IP_FRONT=${IP_FRONT}

WORKDIR /home/app
COPY package*.json .
RUN npm ci
COPY . .
RUN if [ -f Enviroment.ts ]; then rm Enviroment.ts; fi
RUN echo "Archivo Environment.ts eliminado (si existía)"

RUN echo "export const Enviroment = { \
  BACKEND_URL : '${ENV_IP_FRONT}', \
  BACKEND_API_URL : '${ENV_IP_FRONT}', \
  CHAT_WS : '${ENV_IP_FRONT}WebChat' \
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
