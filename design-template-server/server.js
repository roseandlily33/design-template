const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.get("/test-cors", (req, res) => {
//   console.log("Hitting the test");
//   res.json({ message: "CORS works!" });
// });
app.use("/api", apiRoutes);
console.log(" process.env.FE_ROUTE", process.env.FE_ROUTE);
mongoose.connect(process.env.MONGO_URI);

// Use a non-conflicting default port (5001) in case 5000 is occupied by system services
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
