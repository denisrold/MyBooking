const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Running in PORT:${PORT}`);
});
