import express from "express";
import dotenv from "dotenv";

// Database connection
import ConnectDB from "./database/connection";
dotenv.config();
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Zomato Clone Server",
  });
});

app.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log(
        `your server is running on port : https://localhost:${PORT}\nDatabase connected successfully....`
      );
    })
    .catch(() => {
      console.log("Server is running, But database connection failed !!");
    });
});
