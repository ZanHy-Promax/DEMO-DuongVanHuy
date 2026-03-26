# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml trước để cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code và build
COPY src ./src
RUN mvn clean package -DskipTests -B

# ==========================================
# Stage 2: Runtime Stage (Image nhỏ hơn)
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Tạo non-root user để bảo mật
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy JAR từ build stage
COPY --from=builder /app/target/*.jar app.jar

# Đặt quyền sở hữu
RUN chown appuser:appgroup app.jar

# Chuyển sang non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-Dspring.profiles.active=prod", \
    "app.jar"]
