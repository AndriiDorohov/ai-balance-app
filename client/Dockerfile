FROM node:20
WORKDIR /app
COPY . .
RUN npm install && export NODE_OPTIONS="--max-old-space-size=5096"

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
