const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use((req, res, next) => {
  const random = Math.random();
  console.log(random);
  setTimeout(() => {
    if (0.2 < random && random < 0.3) {
      res.status(400);
      return res.json({
        message: "This is the test error",
      });
    } else if (random < 1 && random > 0.3) {
      res.status(500);
      return res.json({
        message: "This is the server error",
      });
    } else {
      return next();
    }
  }, 1000);
});

router.put("/:id/add", async (req, res) => {
  // setTimeout(async () => {
  const { text, status, id } = req.body;
  console.log(text, status, id);
  const user = await User.findById(req.params.id);
  user.todos.push({
    text,
    status,
    id,
  });
  user.save();
  res.end();
  // }, 1500);
});

router.delete("/:id/delete", async (req, res) => {
  const user = await User.findById(req.params.id);
  // setTimeout(async () => {
  const { id } = req.body;
  let index;
  let flag = 0;
  user.todos.forEach((element) => {
    if (element.id === id) {
      flag += 1;
    }
  });
  if (flag !== 0) {
    user.todos.forEach((element, arrayIndex) => {
      if (element.id === id) {
        index = arrayIndex;
      }
    });
    user.todos.splice(index, 1);
    user.save();
    return res.end();
  } else {
    res.status(400);
    return res.json({
      message: "This post does not exist, please refresh the browser",
    });
  }
  // }, 1500);
});

router.post("/:id/post", async (req, res) => {
  // setTimeout(async () => {
  const { id, text } = req.body;
  let user = await User.findById(req.params.id);
  (user.todos = user.todos.map((element) => {
    return element.id === id ? { ...element, text: text } : element;
  })),
    user.save();
  res.end();
  // }, 1000);
});

router.patch("/:id/patch", async (req, res) => {
  // setTimeout(async () => {
  const { id } = req.body;
  let user = await User.findById(req.params.id);
  (user.todos = user.todos.map((element) => {
    return element.id === id
      ? { ...element, status: !element.status }
      : element;
  })),
    user.save();
  res.end();
  // }, 1500);
});

module.exports = router;
