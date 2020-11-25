import express from "express";
import { respond } from "@root/server/util";
import publicRouter from "./public";
import privateRouter from "./private";
import { putClaimer } from "./util";

const router = express.Router();

router.use(putClaimer());

router.get("/", (q, s) => respond(s, { health: true, version: 1 }));

router.use("/public", publicRouter);
router.use("/private", privateRouter);

export default router;
