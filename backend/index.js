const express = require("express");
const env = require("dotenv");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth");
const authHeader = require("./common-middleware/auth");
const contactRoutes = require("./routes/contact");

env.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/phone-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected successfully");
  });
app.use(
  require("cors")({
    origin: "*",
  })
);

app.use(express.json());
app.get("/api/me", authHeader, (req, res) => {
  res.status(200).json({ user: req.user });
});
app.use("/api", userRoutes);
app.use("/api", contactRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
