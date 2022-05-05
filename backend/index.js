const express = require("express");
var cors = require("cors");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const { logger } = require("./middlewares");
app.use(logger);
app.use(cors());
// Statics
app.use(express.static("static"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require("./routes/index");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");
const day = require("./routes/day");

app.use(indexRouter.router);
app.use(blogRouter.router);
app.use(commentRouter.router);
app.use(day.router);

// app.listen(3000, () => {
//   console.log(`Example app listening at http://localhost:3000`);
// });
const port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);
server.listen(port, function () {
  console.log("Server Listen at http://localhost:" + port);
});
