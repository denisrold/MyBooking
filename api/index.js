const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Running in PORT:${PORT}`);
});
