const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "database-1.cp3wri63znyw.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "database-1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
