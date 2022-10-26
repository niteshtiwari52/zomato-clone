import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

// Provite route authirization config
import privateRouteConfig from "./config/route.config";
import googleAuthConfig from "./config/google.config";

// Database connection
import ConnectDB from "./database/connection";

// importing Routes
import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

dotenv.config();
privateRouteConfig(passport);
googleAuthConfig(passport);
const app = express();
const PORT = 4000;

//  adding additional passport configuration

app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: "process.env.JWT_SECRET_KEY",

    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Zomato Clone Server",
  });
});

app.use("/api/v1/auth", Auth);
app.use("/api/v1/food", Food);
app.use("/api/v1/restaurant", Restaurant);
app.use("/api/v1/user", User);
app.use("/api/v1/menu", Menu);
app.use("/api/v1/order", Order);
app.use("/api/v1/review", Review);
app.use("/api/v1/image", Image);

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
