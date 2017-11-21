# Events-Manager
Event-Manager helps manage applications to your event center/ facilities and will either decline events when the proposed day is already taken, or suggest an available day.

Templates are hosted on [gh-pages](https://d3mola.github.io/Events-Manager/)

## Getting Started
Follow the following instructions to get a copy of the project running on your local machine.

#### Prerequisites
Download and install [postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

#### Features
- Authentication with [**JSON Web Tokens**](https://jwt.io/)
- `Signup` - to get registered `POST/api/users`
- `Login` - to be access endpoints `POST/api/users/login`
- `Create a center` - to add a new center. Only an admin can access this route `POST/api/centers`
- `Update a center` - to modify center information. Only an admin can access this route `POST/api/centers/:centerId`
- `Get all centers` - to get a list of all centers. `GET/api/centers/:centerId`
- `Get the details of a center` - to modify center information. Only an admin can access this route `GET/api/centers/:centerId`

#### Installation instructions to get started

```
Clone the repo

git clone https://github.com/d3mola/Events-Manager.git

Install dependencies

npm install

Run migrations

node_modules/.bin/sequelize db:migrate

Start the server

npm run dev

Then visit [localhost:8000](http://localhost:8000)

To vist the above routes, open POSTMAN

Send requests to the endpoints stated

Body of the user routes should be supplied with the following data -
username, email, password, isAdmin(true/false)

Body of the center routes should be supplied with the following data - 
name, loaction, capacity, price, isAvailable(true/ false)
```

## Technologies
- Node js
- Express js
- Sequelize
- Sequelize-cli
- Postgres