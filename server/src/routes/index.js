import express from "express";
import authRoutes from "./auth.js";

const rootRouter = express();

rootRouter.use("/auth", authRoutes);

export default rootRouter;
