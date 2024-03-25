# Documentation for react_news on Docker

## Prerequisites
- Docker installed and configured on your system.

## Instrucciones de Construcción
1. Clone this repository: `git clone https://github.com/johmstone/react_news.git`
2. Navigate to the project directory: `cd react_news`
3. Run the following command to build the Docker image:
`docker build -t react_news .`


## Execution Instructions
1. Once the Docker image is successfully built, execute the following command to start a Docker container:
`docker run -it -p 3000:3000 react_news`


## Access Instructions
1. Open your web browser and visit `http://localhost:3000` to access the React application.

## Debugging
- If you encounter any issues during the Docker container build or execution, make sure to check Docker logs and your React project settings.

## Customization
- You can customize the Docker container settings according to your needs by modifying the Dockerfile or passing environment variables to the container during execution.
