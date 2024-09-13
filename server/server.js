const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const animalRoutes = require("./routes/animalRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/animals", animalRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
