const Knex = require("knex");
// const { knexSnakeCaseMappers } = require("objection");

const knex = Knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "yesmysql123",
        database: process.env.DB_DATABASE || "metro4",
    },
    // ...knexSnakeCaseMappers(),
});
exports.knex = knex;
