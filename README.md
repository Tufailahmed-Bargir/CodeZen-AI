# Full Stack version of  CodeAnt-AI Assignment

## Getting Started

### Local Development (Without Docker)

1. **Install Dependencies**  
   To install the necessary dependencies, run the following command:
   ```bash
   pnpm install

2. **Run the Project**  
Start the development server with the following command and visit http://localhost:3000/:
```bash
pnpm run dev
```

### Using Docker

1. **Build the Docker Image**  
To build the Docker image, execute:
```bash
docker build -t codeant-ai .
```

2. **Run the Docker Container**  
To run the Docker container and expose it on port 3000, use:
```bash
docker run -p 3000:3000 codeant-ai
```
