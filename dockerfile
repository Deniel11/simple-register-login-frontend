FROM node:latest AS build
WORKDIR /angular-app
COPY . /angular-app
RUN npm install -g @angular/cli
RUN npm install
RUN npm run build --production
CMD ["ng", "serve", "--host=0.0.0.0"]