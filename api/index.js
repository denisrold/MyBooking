const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownload = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const BookingModel = require("./models/Booking.js");

require("dotenv").config();

//web ok in 127.0.0.1 no localhost
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
//Pasar a .env
const jwtSecret = "64asd54ad56as5ds4564as46a5";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGODB_URL);

function getUserDataFromToken(req) {
  console.log("Cookies recibidas 1:", req.cookies);
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//Register
app.post("/register", async (req, res) => {
  console.log("Cookies recibidas 2:", req.cookies);
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

//Login
app.post("/login", async (req, res) => {
  console.log("Cookies recibidas 3:", req.cookies);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              domain: "127.0.0.1",
              path: "*",
            })
            .json(userDoc);
        }
      );
    } else {
      res.json("Password not ok");
    }
  } else {
    res.status(422).json("User not found");
  }
});

//Profile

app.get("/profile", async (req, res) => {
  console.log("Cookies recibidas 4:", req.cookies);
  const { token } = req.cookies;
  console.log(req.cookies);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  console.log("Cookies recibidas: 5", req.cookies);
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  console.log("Cookies recibidas 6:", req.cookies);
  const { link } = req.body;

  const newName = "photo" + Date.now() + ".jpg";
  await imageDownload.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
jwt;
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  console.log("Cookies recibidas 7:", req.cookies);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkin: checkIn,
      checkout: checkOut,
      maxGuest: maxGuests,
      price,
    });
    res.json({ placeDoc });
  });
});

app.get("/user-places", async (req, res) => {
  console.log("Cookies recibidas 8:", req.cookies);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  console.log("Cookies recibidas 9:", req.cookies);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  console.log("Cookies recibidas 10:", req.cookies);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkin: checkIn,
        checkout: checkOut,
        maxGuest: maxGuests,
        price,
      });

      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  res.json(await Place.find());
});

app.post("/booking", async (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkout, mobile, name, numberOfGuests, price } =
    req.body;
  BookingModel.create({
    place,
    user: userData.id,
    checkIn,
    checkout,
    mobile,
    name,
    numberOfGuests,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

app.get("/bookings", async (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Running in PORT:${PORT}`);
});
