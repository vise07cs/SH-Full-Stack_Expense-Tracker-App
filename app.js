const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const userRoutes = require("./backend/routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// static frontend
app.use(express.static("public"));

// user routes
app.use("/user", userRoutes);

// sync DB and start server
sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3010, () => {
      console.log("Server running on http://localhost:3010");
    });
  })
  .catch(err => console.error("DB connection error:", err));
