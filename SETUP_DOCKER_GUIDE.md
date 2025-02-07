# Setup Docker Guide

## Docker Hub

- Login account at local

  ```bash
    docker login -u <your-username> -p <your-password>
  ```

- Build Image

  ```bash
    docker build -t <your-dockerhub-username>/<image-name>:<tag> .
  ```

- Push Image

  ```bash
    docker push <your-dockerhub-username>/<image-name>:<tag>
  ```

- Pull Image

  ```bash
    docker pull <your-dockerhub-username>/<image-name>:<tag>
  ```

- Run Container

  ```bash
    docker run -d -p <external-port>:<internal-port> <your-dockerhub-username>/<image-name>:<tag>
  ```

## Github Container Registry (ghcr)

- Login account at local

  ```bash
    echo <YOUR_PERSONAL_ACCESS_TOKEN> | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
  ```

- Build Image

  ```bash
    docker build -t ghcr.io/<your-github-username>/<image-name>:<tag> .
  ```

- Push Image

  ```bash
    docker push ghcr.io/<your-github-username>/<image-name>:<tag>
  ```

- Pull Image

  ```bash
    docker pull ghcr.io/<your-github-username>/<image-name>:<tag>
  ```

- Run Container

  ```bash
    docker run -d -p <external-port>:<internal-port> ghcr.io/<your-github-username>/<image-name>:<tag>
  ```

## Check status Container

- List Container is running

  ```bash
    docker ps
  ```

- Check log of Container

  ```bash
    docker logs <container-id>
  ```
