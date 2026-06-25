# ========================================
# Todo App — Nginx Dockerfile
# Lab 12 Final Work
# ========================================

FROM nginx:1.26-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY . .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
