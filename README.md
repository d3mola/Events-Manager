# Events-Manager
Event-Manager helps manage applications to your event center/ facilities and will either decline events when the proposed day is already taken, or suggest an available day.

Templates are hosted on [gh-pages](https://d3mola.github.io/Events-Manager/)

## Getting Started
Follow the following instructions to get a copy of the project running on your local machine.

### Prerequisites
Download and install [postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

### Installation instructions to get started

- Clone the repo

`git clone https://github.com/d3mola/Events-Manager.git`

- Install dependencies

`npm install`

- Run migrations

`node_modules/.bin/sequelize db:migrate`

- Start the server

`npm run dev`

- Then visit [localhost:8000](localhost:8000)

## Technologies
- Node js
- Express js
- Sequelize
- Sequelize-cli
- Postgres