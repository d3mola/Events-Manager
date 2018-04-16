module.exports = {
  development: {
    username: 'demola',
    password: 'demola?',
    database: 'events_manager_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'demola',
    password: 'demola?',
    database: 'events_manager_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
