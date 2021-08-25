// require('dotenv').config()

// const express = require("express");
// const router = require("./src/routes");

// const PORT = 5000;

// const app = express();
// app.use(express.json());
// app.use("/api/v1", router);

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const path = require("path");

const PORT = 5000; 

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
