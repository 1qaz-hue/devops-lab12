# Lab 12 Final Work — Basic Development and Operation

> Academic cooperation between **School of Computer Science and Engineering, North Minzu University** and **Software Engineering, College of Arts, Media and Technology, Chiang Mai University**
> Academic Year 2024

---

## 👥 团队信息

| 项目 | 成员 1 | 成员 2 |
|------|--------|--------|
| **姓名** | 高靖远 | 顾梓杰 |
| **英文名** | Gao Jingyuan | Gu Zijie |
| **学号** | 20242166 | 20242165 |
| **学院** | 计算机科学与工程学院 | 计算机科学与工程学院 |
| **学校** | 北方民族大学 | 北方民族大学 |
| **分工** | 50% | 50% |

---

## 🌐 应用 URL

| 应用 | 部署 URL | 本地开发 URL |
|------|----------|-------------|
| **个人网站** | `http://<EC2_PUBLIC_IP>` | `http://localhost:80` |
| **Todo 应用** | `http://<EC2_PUBLIC_IP>:8080` | `http://localhost:8080` |

> 部署到 AWS EC2 后，将 `<EC2_PUBLIC_IP>` 替换为你的 EC2 实例的公网 IP 地址。

---

## 📂 项目结构

```
auto-deploy-lab/
├── html/                          # 个人网站源码
│   ├── index.html                 # 个人介绍页面
│   ├── style.css                  # 网站样式
│   └── photo.jpg                  # 你的真实照片（需自行添加）
├── todo-app/                      # Todo 应用（开源风格）
│   ├── index.html                 # Todo 应用页面
│   ├── style.css                  # Todo 应用样式
│   ├── script.js                  # Todo 应用功能（localStorage 持久化）
│   └── Dockerfile                 # Todo 容器化
├── Dockerfile                     # 个人网站容器化（Nginx）
├── docker-compose.yml             # Docker Compose 编排两个服务
├── .github/workflows/             # CI/CD
│   └── deploy-on-push.yml         # GitHub Actions：push 自动部署到 EC2
└── README.md                      # 本文件
```

---

## 🚀 部署步骤

### 1. 准备 AWS EC2 实例

1. 登录 [AWS 控制台](https://console.aws.amazon.com) → EC2 → 启动实例
2. 推荐配置：
   - **AMI**: Ubuntu 22.04 LTS 或 Amazon Linux 2023
   - **实例类型**: `t2.micro`（免费套餐足够）
   - **安全组规则**:
     - HTTP (80) — 0.0.0.0/0
     - 自定义 TCP (8080) — 0.0.0.0/0
     - SSH (22) — 你的 IP
3. 下载 `.pem` 密钥文件
4. 连接到 EC2 并安装 Docker：

```bash
# Ubuntu
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# 重新连接使组成员生效
exit
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
docker --version
docker compose version
```

### 2. 配置 GitHub Secrets

在 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions** 中添加：

| Secret 名称 | 值 |
|-------------|-----|
| `AWS_HOST` | EC2 公网 IP 地址 |
| `AWS_USER` | `ubuntu`（Ubuntu AMI）或 `ec2-user`（Amazon Linux） |
| `AWS_PORT` | `22`（默认 SSH 端口） |
| `AWS_SSH_KEY` | `.pem` 文件的**完整内容**（`cat your-key.pem` 后复制全部） |

### 3. 推送代码触发部署

```bash
# 在本地 auto-deploy-lab 目录中
git init
git add .
git commit -m "Lab 12 Final Work - complete"
git branch -M main
git remote add origin https://github.com/1qaz-hue/devops-lab12.git
git push -u origin main\n```\n\n```bash\n# 验证远程仓库\ngit remote -v\n# 应显示:\n# origin  https://github.com/1qaz-hue/devops-lab12.git (fetch)\n# origin  https://github.com/1qaz-hue/devops-lab12.git (push)
```

推送后，GitHub Actions 会自动执行：
1. 将项目文件复制到 EC2
2. SSH 登录 EC2
3. 运行 `docker compose up --build -d`
4. 输出部署 URL

---

## ✅ 作业要求对照

| # | 要求 | 状态 | 说明 |
|---|------|------|------|
| 1 | 创建 GitHub 仓库 | ✅ | 推送代码后即完成 |
| 2 | 创建个人介绍网站（含照片） | ✅ | `html/index.html` + `photo.jpg` |
| 3 | 创建 Dockerfile 容器化网站 | ✅ | `Dockerfile`（Nginx） |
| 4 | 创建 GitHub Workflow (CI/CD) | ✅ | `.github/workflows/deploy-on-push.yml` |
| 5 | 使用 Docker Compose 部署 | ✅ | `docker-compose.yml` |
| 6 | 添加 Todo 开源应用 | ✅ | `todo-app/`（完整 Todo 应用） |
| 7 | 两个应用部署到同一服务器 | ✅ | 同一 docker-compose 编排 |
| 8 | 屏幕录制 .mp4 | ⏳ | 需你自行录制（见下方） |

---

## 🎥 屏幕录制指南（要求 8）

按以下流程录制 `.mp4` 视频（建议使用 OBS Studio）：

1. **创建 GitHub 仓库** — 演示 `git init` → `add` → `commit` → `push`
2. **展示个人网站** — `html/index.html` 文件内容和照片
3. **展示 Dockerfile** — 个人网站的 Dockerfile
4. **展示 GitHub Workflow** — `.github/workflows/deploy-on-push.yml`
5. **展示 Docker Compose** — `docker-compose.yml`（含两个服务）
6. **展示 Todo 应用** — `todo-app/` 目录及其 Dockerfile
7. **演示部署** — SSH 到 EC2，运行 `docker compose up --build -d`，展示运行状态
8. **验证结果** — 浏览器中打开个人网站和 Todo 应用的 URL

---

## 📝 分组信息

| 项目 | 内容 |
|------|------|
| 分组方式 | 团队合作 |
| 人数 | 2 人 |
| 分工 | 高靖远 50% / 顾梓杰 50% |

**团队成员：**
| 姓名 | 学号 | 分工 |
|------|------|------|
| 高靖远 (Gao Jingyuan) | 20242166 | 50% |
| 顾梓杰 (Gu Zijie) | 20242165 | 50% |

---

## 📄 许可

This project is created for academic purposes as part of the Lab 12 Final Work.
