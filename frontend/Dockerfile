# 이미지 빌드
FROM node:alpine AS builder

# 경로 설정
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# port 설정
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]