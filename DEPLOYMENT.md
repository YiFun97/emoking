# 阿里云轻量服务器部署指南

本文档介绍如何将 **Emoking** 项目部署到阿里云轻量云服务器（已预装 Docker 镜像）。

---

## 📋 前置条件

- 阿里云轻量云服务器（2核2G3M，Docker 镜像）
- Docker 26.1.3（已预装）
- 本地已安装 Git

---

## 🚀 第一步：连接服务器

使用 SSH 连接到您的服务器：

```bash
ssh root@您的服务器IP
```

验证 Docker 已安装：

```bash
docker --version
# 应显示: Docker version 26.1.3

docker compose version
# 应显示: Docker Compose version v2.x.x
```

---

## 📦 第二步：部署项目

### 2.1 上传项目代码

**方法一：使用 Git（推荐）**

```bash
# 创建项目目录
mkdir -p /opt/apps
cd /opt/apps

# 克隆项目（替换为您的 Git 仓库地址）
git clone https://github.com/你的用户名/vibe-coding.git
cd vibe-coding
```

**方法二：直接上传**

在本地终端执行：
```bash
# Windows PowerShell
scp -r .\vibe-coding root@您的服务器IP:/opt/apps/

# 然后 SSH 到服务器
ssh root@您的服务器IP
cd /opt/apps/vibe-coding
```

### 2.2 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 生成安全密钥
openssl rand -base64 32

# 编辑环境变量（记得把上面生成的密钥复制进去）
vi .env
```

`.env` 文件内容：

```bash
# 把上一步生成的密钥粘贴到这里
BETTER_AUTH_SECRET=你生成的密钥

# 修改为您的服务器地址
BETTER_AUTH_URL=http://您的服务器IP:3000
NEXT_PUBLIC_APP_URL=http://您的服务器IP:3000

# 或者如果有域名
# BETTER_AUTH_URL=https://www.yourdomain.com
# NEXT_PUBLIC_APP_URL=https://www.yourdomain.com
```

按 `Esc` 输入 `:wq` 保存退出。

### 2.3 创建数据目录

```bash
# 创建数据目录（SQLite 数据库将存储在这里）
mkdir -p data
chmod 755 data
```

### 2.4 构建并启动应用

```bash
# 构建并启动（首次需要几分钟下载镜像和构建）
docker compose up -d --build

# 实时查看构建日志
docker compose logs -f

# 看到应用启动成功后，按 Ctrl+C 退出日志查看
```

### 2.5 验证部署

```bash
# 查看容器状态
docker compose ps

# 应该看到 app 容器 STATUS 为 Up
```

---

## � 第三步：配置防火墙

### 阿里云安全组配置

1. 登录 [阿里云控制台](https://www.aliyun.com/)
2. 进入 **轻量应用服务器** 控制台
3. 选择您的服务器 → **防火墙**
4. 点击 **添加规则**：
   - 应用类型：`自定义`
   - 端口：`3000`
   - 备注：`Next.js 应用`
5. 点击 **确定**

---

## ✅ 第四步：访问应用

在浏览器中访问：

| 页面 | 地址 |
|------|------|
| 主页 | `http://您的服务器IP:3000` |
| 博客 | `http://您的服务器IP:3000/blog` |
| 管理 | `http://您的服务器IP:3000/admin` |
| 登录 | `http://您的服务器IP:3000/login` |

---

## � 常用命令

```bash
# 查看日志
docker compose logs -f

# 重启应用
docker compose restart

# 停止应用
docker compose down

# 更新应用（拉取新代码后）
git pull
docker compose down
docker compose up -d --build

# 备份数据库
cp ./data/app.db ./data/app.db.backup.$(date +%Y%m%d)

# 清理磁盘空间
docker system prune -a
```

---

## 🌐 配置域名（可选）

如果您有域名，可以配置 Nginx 反向代理：

### 安装 Nginx

```bash
apt update && apt install nginx -y
```

### 创建配置文件

```bash
cat > /etc/nginx/sites-available/emoking << 'EOF'
server {
    listen 80;
    server_name www.yourdomain.com yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 启用配置
ln -s /etc/nginx/sites-available/emoking /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx
```

### 配置 SSL（推荐）

```bash
# 安装 Certbot
apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
certbot --nginx -d www.yourdomain.com -d yourdomain.com

# 更新 .env 文件
vi .env
# 把 http:// 改为 https://

# 重启应用
docker compose restart
```

---

## ⚠️ 常见问题

### 构建时内存不足

```bash
# 创建 2G swap 分区
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 然后重新构建
docker compose up -d --build
```

### 端口 3000 被占用

```bash
# 查看占用进程
netstat -tlnp | grep 3000

# 杀掉进程后重试
kill -9 进程ID
docker compose up -d
```

### 数据库权限问题

```bash
chown -R 1001:1001 ./data
chmod 755 ./data
docker compose restart
```

---

## 🎉 完成

恭喜！您的应用已成功部署到阿里云服务器。

快速检查清单：
- [ ] `docker compose ps` 显示容器运行中
- [ ] 浏览器能访问 `http://服务器IP:3000`
- [ ] 阿里云防火墙已开放 3000 端口
