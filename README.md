# 🐳 Spring Boot Docker Demo

Demo project minh họa cách containerize ứng dụng Spring Boot với MySQL bằng Docker và Docker Compose.

## 📋 Tech Stack

| Công nghệ | Phiên bản |
|-----------|-----------|
| Java | 17 |
| Spring Boot | 3.2.3 |
| MySQL | 8.0 |
| Docker | Multi-stage build |
| Docker Compose | v3.8 |

## 🏗️ Cấu trúc Project

```
docker-demo/
├── src/
│   └── main/
│       ├── java/com/demo/dockerdemo/
│       │   ├── DockerDemoApplication.java
│       │   ├── controller/
│       │   │   ├── ProductController.java   # CRUD API
│       │   │   └── HealthController.java    # App info
│       │   ├── service/
│       │   │   └── ProductService.java
│       │   ├── repository/
│       │   │   └── ProductRepository.java
│       │   ├── entity/
│       │   │   └── Product.java
│       │   ├── dto/
│       │   │   └── ProductRequest.java
│       │   └── exception/
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           ├── application.yml              # Config với env variables
│           └── data.sql                     # Sample data
├── init-db/
│   └── 01-init.sql                          # MySQL init script
├── Dockerfile                               # Multi-stage build
├── docker-compose.yml                       # MySQL + App
├── .dockerignore
├── push-to-dockerhub.sh                     # Push lên DockerHub
└── pom.xml
```

## 🚀 Chạy với Docker Compose

### Bước 1: Clone và chạy
```bash
# Chạy toàn bộ stack (MySQL + App)
docker compose up --build -d

# Xem logs
docker compose logs -f

# Dừng
docker compose down

# Dừng và xóa volumes
docker compose down -v
```

### Bước 2: Kiểm tra ứng dụng
```bash
# Health check
curl http://localhost:8080/actuator/health

# App info
curl http://localhost:8080/api/info

# Lấy tất cả sản phẩm
curl http://localhost:8080/api/products
```

## 📡 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/info` | Thông tin ứng dụng |
| GET | `/api/products` | Lấy tất cả sản phẩm |
| GET | `/api/products/{id}` | Lấy sản phẩm theo ID |
| POST | `/api/products` | Tạo sản phẩm mới |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm |
| DELETE | `/api/products/{id}` | Xóa sản phẩm |
| GET | `/api/products/search?name=...` | Tìm kiếm sản phẩm |
| GET | `/actuator/health` | Health check |

### Ví dụ tạo sản phẩm:
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPad Pro M4",
    "description": "Máy tính bảng cao cấp",
    "price": 28000000,
    "quantity": 20
  }'
```

## 🐳 Build Docker Image thủ công

```bash
# Build image
docker build -t docker-demo:latest .

# Chạy chỉ app (cần MySQL riêng)
docker run -p 8080:8080 \
  -e MYSQL_HOST=host.docker.internal \
  -e MYSQL_DATABASE=dockerdemo \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=rootpassword \
  docker-demo:latest
```

## 📦 Push lên Docker Hub

### Cách 1: Dùng script có sẵn
```bash
# Sửa DOCKERHUB_USERNAME trong file trước
./push-to-dockerhub.sh
```

### Cách 2: Thủ công
```bash
# Đăng nhập
docker login

# Build và tag
docker build -t YOUR_USERNAME/docker-demo:latest .
docker tag YOUR_USERNAME/docker-demo:latest YOUR_USERNAME/docker-demo:1.0.0

# Push
docker push YOUR_USERNAME/docker-demo:latest
docker push YOUR_USERNAME/docker-demo:1.0.0
```

### Cách 3: Dùng image từ Docker Hub
```bash
# Pull và chạy
docker pull YOUR_USERNAME/docker-demo:latest

# Chạy với docker compose (thay image trong docker-compose.yml)
# Đổi: build: . -> image: YOUR_USERNAME/docker-demo:latest
docker compose up -d
```

## 🔑 Environment Variables

| Variable | Default | Mô tả |
|----------|---------|-------|
| `MYSQL_HOST` | `localhost` | MySQL host |
| `MYSQL_PORT` | `3306` | MySQL port |
| `MYSQL_DATABASE` | `dockerdemo` | Tên database |
| `MYSQL_USER` | `root` | MySQL user |
| `MYSQL_PASSWORD` | `rootpassword` | MySQL password |
| `SERVER_PORT` | `8080` | App port |

## 🔍 Kiểm tra containers

```bash
# Xem containers đang chạy
docker ps

# Xem logs từng service
docker compose logs app
docker compose logs mysql

# Vào MySQL container
docker exec -it dockerdemo-mysql mysql -u root -prootpassword dockerdemo

# Xem images
docker images
```
