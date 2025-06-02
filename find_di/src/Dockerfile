# 빌드 단계
FROM node:18 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# serve를 사용해 정적 파일 호스팅
FROM node:18-alpine
RUN yarn global add serve

WORKDIR /app
COPY --from=build /app/build .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
