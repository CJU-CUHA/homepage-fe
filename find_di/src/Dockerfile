# 1단계: 빌드 단계
FROM node:18 as build

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 전체 프로젝트 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: serve로 정적 파일 서빙
FROM node:18-alpine

# serve 전역 설치
RUN npm install -g serve

WORKDIR /app

# 빌드된 정적 파일 복사
COPY --from=build /app/build .

# 포트 오픈 및 실행
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
