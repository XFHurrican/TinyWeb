# TinyWeb 项目

## 项目简介
TinyWeb是一个基于FastAPI和React的全栈Web应用程序，提供了书籍管理、用户认证和评论系统等功能。该项目采用前后端分离架构，后端提供RESTful API，前端负责用户界面和交互。

## 技术栈
### 后端
- Python 3.12
- FastAPI
- SQLAlchemy (ORM)
- SQLite (数据库)

### 前端
- React
- Axios
- CSS
- Vite (构建工具)

## 项目结构
```
TinyWeb/
├── .gitignore          # Git忽略文件
├── README.md           # 项目说明文档
├── backend/            # 后端代码
│   ├── app/            # FastAPI应用
│   ├── database.py     # 数据库配置
│   ├── main.py         # 入口文件
│   ├── models.py       # 数据模型
│   ├── requirements.txt # 依赖包列表
│   ├── schemas.py      # 数据验证和序列化
│   └── tests/          # 测试代码
├── frontend/           # 前端代码
│   ├── public/         # 静态资源
│   ├── src/            # 源代码
│   │   ├── assets/     # 资源文件
│   │   ├── components/ # React组件
│   │   ├── data/       # 数据文件
│   │   ├── App.jsx     # 应用入口
│   │   ├── index.css   # 全局样式
│   │   └── main.jsx    # 渲染入口
│   ├── .gitignore      # 前端Git忽略文件
│   ├── index.html      # HTML模板
│   ├── package.json    # 前端依赖
│   └── vite.config.js  # Vite配置
├── docker-compose.yml  # Docker Compose配置
└── nginx.conf          # Nginx配置
```

## 安装和运行
### 后端
1. 进入后端目录
```bash
cd backend
```
2. 安装依赖
```bash
pip install -r requirements.txt
```
3. 运行FastAPI服务
```bash
uvicorn main:app --reload
```

### 前端
1. 进入前端目录
```bash
cd frontend
```
2. 安装依赖
```bash
npm install
```
3. 运行开发服务器
```bash
npm run dev
```

## 功能特点
1. 用户认证系统（注册、登录、登出）
2. 书籍管理（查看书籍列表、书籍详情）
3. 评论系统（添加评论、查看评论）
4. 响应式设计，适配不同设备

## 数据库
项目使用SQLite数据库，数据存储在`backend/book_fans.db`文件中，无需额外安装数据库服务。

## 如何贡献
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/fooBar`)
3. 提交更改 (`git commit -am 'Add some fooBar'`)
4. 推送到分支 (`git push origin feature/fooBar`)
5. 创建新的Pull Request

## 许可证
本项目采用MIT许可证 - 详情见LICENSE文件

## 联系方式
如有问题或建议，请联系项目维护者。