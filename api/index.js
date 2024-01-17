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

//web ok in 127.0.0.1 // no localhost
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
//Pasar a .env
const jwtSecret = process.env.JWT_SECRET;
const corsOrigin = process.env.CORS_ORIGIN;
const cookieDomain = process.env.COOKIE_DOMAIN;
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  })
);

mongoose.connect(process.env.MONGODB_URL);

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//Register
app.post("/api/register", async (req, res) => {
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
app.post("/api/login", async (req, res) => {
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
              domain: cookieDomain,
              path: "*",
              sameSite: "None", // Indica que la cookie no tiene restricciones de sitio
              secure: true, // Indica que la cookie solo se enviará sobre conexiones seguras (HTTPS),
              // httpOnly: true,
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

app.get("/api/profile", async (req, res) => {
  const { token } = req.cookies;

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

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
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
app.post("/api/upload", photosMiddleware.array("photos", 100), (req, res) => {
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

app.post("/api/places", async (req, res) => {
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

app.get("/api/user-places", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/api/places", async (req, res) => {
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

app.get("/api/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/api/booking", async (req, res) => {
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

app.get("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});

app.listen(PORT, () => {
  console.log(`Running in PORT:${PORT}`);
});
