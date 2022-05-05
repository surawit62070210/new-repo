// const { Client } = require("pg");

// const pool = new Client({
//   host: "booking-db.cbllwizyucj3.us-east-1.rds.amazonaws.com",
//   user: "postgres",
//   password: "12345678",
//   database: "booking_DB",
//   port: 5432,
// });
// pool.connect();
// module.exports = pool;

// module.exports.pool = async () => {
//   const client = new Client({
//     host: "database-2.cbllwizyucj3.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "12345678",
//     database: "booking-db",
//     port: 5432,
//     ssl: true,
//   });
//   await client.connect();
//   return client;
// };
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "database-2.cbllwizyucj3.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "booking-db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
