import express from "express";
import auth from "./auth";
import jwt from "express-jwt";
import getConfig from "@root/config";

const config = getConfig();
const router = express.Router();

router.use(jwt({ secret: config.publicKey, algorithms: ["RS512"] }));

router.use("/auth", auth);

export default router;
