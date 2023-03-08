/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Class = require("./models/schoolClass");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// SignIn.js
router.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        classes: req.body.classes,
      });

      newUser.save().then(() => {
        res.send({});
      });
    } else {
      console.log("user exists: logging in");

      res.status(409).send({ message: "User already exists" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Schedule.js

router.get("/users/:email/classes", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user.classes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/classes/:classid", async (req, res) => {
  try {
    const existingClass = await Class.findOne({ classid: req.params.classid });

    if (existingClass) {
      res.send(existingClass);
    } else {
      res.status(404).send({ error: "Class not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ClassSetup.js

router.post("/classes", (req, res) => {
  const newClass = new Class({
    name: req.body.name,
    blockNumber: req.body.blockNumber,
    classid: req.body.classid,
    days: req.body.days,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    creator: req.body.creator,
  });
  newClass.save().then(() => {
    res.send({ message: "success" });
  });
});

router.post("/users/:email/classes", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.classes.push(req.body.classid);
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/users/:email/createdClasses", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.createdClasses.push(req.body.classid);
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Profile.js

router.get("/users/:email/createdClasses", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user.createdClasses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Thread.js

router.get("/messages", (req, res) => {
  const classid = req.query.classid.slice(0, -1);
  Message.find({ classid: classid }).then((messageObj) => {
    res.send(messageObj);
  });
});

router.post("/message", (req, res) => {
  const newMessage = new Message({
    name: req.body.name,
    time: req.body.time,
    uid: req.body.uid,
    content: req.body.content,
    classid: req.body.classid,
  });
  newMessage.save().then(() => {
    res.send({});
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
