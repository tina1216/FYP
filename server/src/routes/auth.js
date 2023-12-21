import express from "express";
import controllers from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.get("/login", (req, res) => {
  controllers.login(req, res);
});

authRoutes.post("/signup", (req, res) => {
  controllers.signup(req, res);
});

export default authRoutes;
