#!/bin/bash
# ==============================================
# Script: push-to-dockerhub.sh
# Mục đích: Build image và push lên Docker Hub
# ==============================================

# ⚙️ CẤU HÌNH - Thay đổi các giá trị này
DOCKERHUB_USERNAME="your-dockerhub-username"   # <<< Thay bằng username Docker Hub của bạn
IMAGE_NAME="docker-demo"
IMAGE_TAG="latest"
FULL_IMAGE="${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "============================================"
echo "  Docker Hub Push Script"
echo "  Image: ${FULL_IMAGE}"
echo "============================================"

# Bước 1: Đăng nhập Docker Hub
echo ""
echo "📦 Bước 1: Đăng nhập Docker Hub..."
docker login
if [ $? -ne 0 ]; then
    echo "❌ Đăng nhập thất bại!"
    exit 1
fi

# Bước 2: Build Docker image
echo ""
echo "🔨 Bước 2: Build Docker image..."
docker build -t ${FULL_IMAGE} .
if [ $? -ne 0 ]; then
    echo "❌ Build thất bại!"
    exit 1
fi

# Bước 3: Tag thêm với version cụ thể
VERSION_TAG="${DOCKERHUB_USERNAME}/${IMAGE_NAME}:1.0.0"
docker tag ${FULL_IMAGE} ${VERSION_TAG}
echo "✅ Tagged: ${VERSION_TAG}"

# Bước 4: Push lên Docker Hub
echo ""
echo "🚀 Bước 3: Push lên Docker Hub..."
docker push ${FULL_IMAGE}
docker push ${VERSION_TAG}

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push thành công!"
    echo "🌐 Image có thể pull tại: docker pull ${FULL_IMAGE}"
else
    echo "❌ Push thất bại!"
    exit 1
fi

echo ""
echo "============================================"
echo "  Hoàn thành!"
echo "  🔗 https://hub.docker.com/r/${DOCKERHUB_USERNAME}/${IMAGE_NAME}"
echo "============================================"
