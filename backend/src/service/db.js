const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Nico2.718",
  port: 5432,
});
module.exports = pool;
