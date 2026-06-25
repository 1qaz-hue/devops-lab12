# ========================================
# Personal Website — Nginx Dockerfile
# Lab 12 Final Work
# ========================================

# 阶段 1: 使用 Nginx Alpine 作为基础镜像（体积小、安全）
FROM nginx:1.26-alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除 Nginx 默认页面
RUN rm -rf ./*

# 复制个人网站文件
COPY ./html/ .

# 暴露 80 端口
EXPOSE 80

# Nginx 前台运行（容器不退出的标准做法）
CMD ["nginx", "-g", "daemon off;"]
