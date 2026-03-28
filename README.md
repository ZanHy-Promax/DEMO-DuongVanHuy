# Spring Boot Docker Demo

Demo project minh hoa cach dong goi ung dung Spring Boot thanh Docker image va deploy bang GitHub Actions.

## Tech Stack

| Cong nghe | Phien ban |
|-----------|-----------|
| Java | 17 |
| Spring Boot | 3.2.3 |
| H2 Database | Runtime |
| Docker | Multi-stage build |
| Docker Compose | v3.8 |

## Mo ta

Ung dung hien chay doc lap, khong can MySQL hoac bat ky service ngoai nao.
Du lieu test duoc nap tu `DataLoader` khi app khoi dong.

## Chay voi Docker Compose

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

## Build va chay Docker image

```bash
docker build -t docker-demo:latest .
docker run -p 8080:8080 docker-demo:latest
```

## API nhanh

```bash
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/info
curl http://localhost:8080/api/products
```

## Push len Docker Hub

```bash
docker login
docker build -t YOUR_USERNAME/docker-demo:latest .
docker push YOUR_USERNAME/docker-demo:latest
```

## Environment Variables

| Variable | Default | Mo ta |
|----------|---------|-------|
| `SERVER_PORT` | `8080` | App port |
