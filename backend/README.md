# Evora backend

![GitHub contributors](https://img.shields.io/github/contributors/bakaqc/evora-17c)
![GitHub top language](https://img.shields.io/github/languages/top/bakaqc/evora-17c)
![GitHub repo size](https://img.shields.io/github/repo-size/bakaqc/evora-17c)
![GitHub License](https://img.shields.io/github/license/bakaqc/evora-17c)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bakaqc_evora-17c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bakaqc_evora-17c)

> Evora connects customers with event organizers quickly through detailed online booking.

## Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name                 | Description                                         | Example                                      |
| --- | ----------------------------- | --------------------------------------------------- | -------------------------------------------- |
| 1   | DATABASE_URL                  | The URL to the MongoDB database                     | localhost:27017/evora                        |
| 2   | JWT_SECRET                    | The secret key for JWT                              | secret-key                                   |
| 3   | JWT_EXPIRES                   | The expiration time for JWT                         | 1h                                           |
| 4   | GOOGLE_OAUTH2_CLIENT_ID       | The Google client ID                                | abcxyz                                       |
| 5   | GOOGLE_OAUTH2_CLIENT_SECRET   | The Google client secret                            | secret-key                                   |
| 6   | GOOGLE_OAUTH2_CLIENT_CALLBACK | The Google client callback URL                      | http://localhost:3000/api/auth/user/callback |
| 7   | ALLOWED_ORIGINS               | The allowed origins for CORS (separated by commas ) | http://localhost:3000,https://localhost:3001 |
| 8   | FRONTEND_URL                  | The URL to the frontend                             | http://localhost:5173                        |

## Development

- Step 1: Install dependencies

  ```bash
  pnpm i
  ```

- Step 2: Start the development server

  ```bash
  pnpm start:dev
  ```

- Step 3: Open the browser and navigate to [http://localhost:3000](http://localhost:3000)

### Build & push container to Docker Hub

- Setup `Dockerfile`

  ```bash
  # Example file:

  FROM node:lts-alpine
  WORKDIR /app
  COPY . .
  RUN yarn install --production
  CMD ["node", "src/index.js"]
  EXPOSE 3000
  ```

- Build image Docker

  ```bash
  docker build -t your-dockerhub-username/image-name:[tag] .
  ```

- Push image to Docker Hub

  ```bash
  docker push your-dockerhub-username/image-name:[tag]
  ```

- Run docker container

  ```bash
  docker run -p 3000:3000 --env-file .env your-dockerhub-username/image-name:[tag]
  ```

### Pull & run container

- Pull image từ Docker Hub:

  ```bash
  docker pull your-dockerhub-username/image-name:[tag]
  ```

- Chạy container:

  ```bash
  docker run -d -p 3000:3000 --name evora-backend your-dockerhub-username/image-name:[tag]
  ```

- Kiểm tra container đang chạy:

  ```bash
  docker ps
  ```
