module.exports = {
  development: {
    username: 'postgres',
    password: 'ariya',
    database: 'events-manager-db',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'ariya',
    database: 'events_manager_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_node_env: 'DATABASE_URL'
  }
};
