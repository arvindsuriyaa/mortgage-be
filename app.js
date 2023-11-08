require("dotenv").config();
const express = require("express");
const mongoDb = require("mongoose");
const sampleRoutes = require("./routes/sampleRoutes.js");
const cors = require('cors');

const app = express();

mongoDb
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log("DB is connected"))
  .catch((err) => console.log("err======>", err));

const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());
app.listen(PORT);

app.get("/", (req, res) => {
  res.send({ message: "App is up and running" });
});

app.use(sampleRoutes);
