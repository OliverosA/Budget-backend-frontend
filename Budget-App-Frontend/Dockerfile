## Build
# docker build -t full-front:0.1.0-nginx-alpine .
# docker tag full-front:0.1.0-nginx-alpine oliverosa/full-front:0.1.0-nginx-alpine
# docker push oliverosa/full-front:0.1.0-nginx-alpine
## Run
# docker run -p 3000:80 -d full-front:0.1.0-nginx-alpine

## Entrar al contenedor
# docker run -it full-front:0.1.0 /bin/bash

FROM node:18.9.0 as compilacion

COPY . /opt/app

WORKDIR /opt/app

ENV REACT_APP_BACKEND_BASE_URL=http://localhost:8500/api/v1

RUN npm install

RUN npm run build

FROM nginx:1.22.0-alpine

COPY --from=compilacion /opt/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]