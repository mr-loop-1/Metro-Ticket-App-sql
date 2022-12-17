const Knex = require("knex");
// const { knexSnakeCaseMappers } = require("objection");

const knex = Knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "yesmysql123",
        database: "metro4",
    },
    // ...knexSnakeCaseMappers(),
});
exports.knex = knex;
