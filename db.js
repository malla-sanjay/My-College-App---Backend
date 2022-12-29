const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "permission",
  host: "localhost",
  port: 5432,
  database: "my_college_app",
});

module.exports = pool;
