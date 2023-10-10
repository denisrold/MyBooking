const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ email, name, password });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Running in PORT:${PORT}`);
});
