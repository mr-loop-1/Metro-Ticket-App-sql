const path = require('path')


module.exports = {

  development: {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "yesmysql123",
        database: process.env.DB_DATABASE || "metro4",
    },
    migrations: {
        directory: path.join(__dirname, 'database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'database/seeders'),
    }
    // ...knexSnakeCaseMappers(),
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      directory: "./database/migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(__dirname, 'database/seeders'),
    },
    // ...knexSnakeCaseMappers(),
  }

};
