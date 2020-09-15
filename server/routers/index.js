const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/reg", (req, res) => {
  setTimeout(async () => {
    console.log("strat");
    const { name, email, password } = req.body;
    let userEmail = await User.findOne({ email });
    if (userEmail) {
      res.status(401);
      return res.json({ message: "User with such an e-mail already exists" });
    } else {
      const user = await User.create({ name, email, password });
      req.session.user = user.name;
      const userSend = {
        name: user.name,
        id: user._id,
        email: user.email,
        todos: user.todos,
      };
      res.status(200);
      return res.json({ userSend });
    }
  }, 1500);
});

router.post("/log", (req, res) => {
  setTimeout(async () => {
    console.log("start");
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        req.session.user = user.name;
        const userSend = {
          name: user.name,
          id: user._id,
          email: user.email,
          todos: user.todos,
        };
        res.status(200);
        return res.json({ userSend });
      } else {
        res.status(401);
        return res.json({ message: "Password you provided is wrong" });
      }
    } else {
      res.status(401);
      return res.json({ message: "E-mail you provided is wrong" });
    }
  }, 1500);
});

router.use((req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).end();
});

router.delete("/user", (req, res) => {
  req.session.destroy();
  return res.end();
});

module.exports = router;
