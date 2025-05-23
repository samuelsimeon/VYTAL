// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

// Import your auth routes
import authRoutes from "./routes/auth.js";
// Import log routes
import logRoutes from "./routes/logRoutes.js";
// Import meal routes
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3009;

// Set up EJS templating
app.set("view engine", "ejs");
app.set("views", "./views");

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

// Middleware for JSON parsing
app.use(express.json());

// Parse CORS_ORIGIN into an array (comma‑separated in your .env)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Mount your routes
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/meals", mealRoutes);

// EJS dashboard demo
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { username: "SampleUser" });
});

// Health check / root
app.get("/", (req, res) => {
  res.send("Hello from the Fitness App API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
