const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/thunk-saga", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(
  session({
    secret: "SHJHDJKSHD",
  })
);

app.use((req, res, next) => {
  if (req.session.user) {
    console.log("The user is logged");
  } else {
    console.log("The user is not logged");
  }
  return next();
});

const PORT = process.env.PORT || 3001;

const indexRouter = require("./routers/index");
const todoRouter = require("./routers/todo");

app.get("/", (req, res) => {
  res.send("The server is OK");
});

app.use("/", indexRouter);
app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log(`The server is listening on PORT ${PORT}`);
});
