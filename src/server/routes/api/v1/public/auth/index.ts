import express from "express";

import makeExchange from "./makeExchange";
import makeLogin from "./makeLogin";
import sendLoginCode from "./sendLoginCode";
import wordlist from "./wordlist";

const router = express.Router();

router.use("/wordlist", wordlist);
router.use("/sendLoginCode", sendLoginCode);
router.use("/makeExchange", makeExchange);
router.use("/makeLogin", makeLogin);

export default router;
