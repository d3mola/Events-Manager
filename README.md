# Events-Manager
[![Build Status](https://travis-ci.org/d3mola/Events-Manager.svg?branch=develop)](https://travis-ci.org/d3mola/Events-Manager)
[![Coverage Status](https://coveralls.io/repos/github/d3mola/Events-Manager/badge.png?branch=develop)](https://coveralls.io/github/d3mola/Events-Manager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/abd43ed17975a9cf3c11/maintainability)](https://codeclimate.com/github/d3mola/Events-Manager/maintainability)
[![codecov](https://codecov.io/gh/d3mola/Events-Manager/branch/develop/graph/badge.svg)](https://codecov.io/gh/d3mola/Events-Manager)

Event-Manager is a simple application that helps manage your events or  centers.

## Hosted Application
Templates are hosted on github pages - https://d3mola.github.io/Events-Manager

App is hosted on heroku - https://party-palace.herokuapp.com

## Technologies
- Node js
- Express js
- Sequelize
- Sequelize-cli
- Postgres
- React
- Webpack

## Getting Started
Follow the following instructions to get a copy of the project running on your local machine.

## Installation
1. Download and install [postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Clone the repo with - `git clone https://github.com/d3mola/Events-Manager.git`
3. Change to the paroject directly - `cd Events-Manager`
4. Install dependencies - `npm install`
5. Using the `.env.example` file as a guide, create a `.env` file and add your variables
6. Run migrations with - `npm run migrate`
7. Start the server - `npm run start:server`
8. In a seperate terminal, start the client - `npm run start:client`
9. Visit `localhost:8080` to view the app in a broswer

## Test
1. Server tests - `npm run test:server`
2. Client tests - `npm run test:client`
3. End to end tests - `npm run test:e2e`

## API Documentation
The documentation was created with swagger and you can find it at 
[documentation](https://party-palace.herokuapp.com/api/v1/docs/)

## Contribution
- Fork this repository.
- Clone it.
- Push your changes to the remote branch
- Open a pull request to the develop branch, and describe how your feature works


Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>


## License

#### [MIT](./LICENSE) © [Ademola Ariya](https://twitter.com/demostic)

