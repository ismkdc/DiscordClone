
# Project Title: Discord React Clone with ASP.NET Core 7.0 Backend

[Demo](https://discord.ismkdc.com)

This project is a Discord-like messaging application that uses ASP.NET Core 7.0 as the backend, along with Docker Compose, Redis Cluster, Centrifugo WebSocket server, .NET Core Channels, and background workers. The frontend is built using the [Discord React Clone](https://github.com/rafaelalmeidatk/discord-react-clone) project by Rafael Almeida.

## Table of Contents

1.  [Features]
2.  [Prerequisites]
3.  [Installation]
4.  [Usage
5.  [Contributing]
6.  [License]

## Features

-   Real-time messaging using Centrifugo WebSocket server and .NET Core Channels
-   Scalable architecture with Docker Compose and Redis Cluster
-   Background workers for efficient task processing
-   Modern, responsive frontend based on Discord React Clone project

## Prerequisites

-   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
-   [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) for frontend development
-   [ASP.NET Core 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0) for backend development
-   [Centrifugo](https://centrifugal.github.io/centrifugo/) installed

## Installation

1.  Clone this repository:

bashCopy code

`git clone https://github.com/ismkdc/DiscordClone` 

2.  Navigate to the project directory:

bashCopy code

`cd DiscordClone` 

3.  Build and start Docker containers:

bashCopy code

`docker compose up --build -d` 

4.  Install frontend dependencies:

bashCopy code

`cd discord-react-clone
yarn install` 

5.  Start the frontend development server:

bashCopy code

`yarn start` 

## Usage

1.  Access the frontend application at `http://localhost:3000/`.
2.  Register a new user or log in with an existing account.
3.  Start chatting in real-time with other users.

## Contributing

1.  Fork the project.
2.  Create your feature branch: `git checkout -b feature/your-feature-name`.
3.  Commit your changes: `git commit -m "Add some feature"`.
4.  Push to the branch: `git push origin feature/your-feature-name`.
5.  Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE] file for more information.
