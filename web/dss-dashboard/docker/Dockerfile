
FROM node:10-alpine3.9 AS build  
ARG WORK_DIR
WORKDIR /app
ENV NODE_OPTIONS "--max-old-space-size=1792"

# copy the project files
COPY ${WORK_DIR} .
RUN npm i && npm run build

# Create runtime image
FROM nginx:mainline-alpine 
ENV WEB_DIR=/var/web/dashboard

RUN mkdir -p ${WEB_DIR}

COPY --from=build /app/build ${WEB_DIR}/
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf