const { Pool } = require("pg");

const pool = new Pool({
  host: "booking-db.cbllwizyucj3.us-east-1.rds.amazonaws.com",
  user: "postgres",
  password: "12345678",
  database: "booking_DB",
  port: 5432,
});

module.exports = pool.connect();

// const mysql = require("mysql2/promise");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "project",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
// module.exports = pool;
