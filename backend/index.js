const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./authRoutes")
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes)


app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en puerto 3000")
});

