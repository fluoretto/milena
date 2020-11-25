import express from "express";
import { respond } from "@root/server/util";
import wordlist from "@root/services/wordlist";

const router = express.Router();

router.get("/", (q, s) => respond(s, wordlist.getWordlist()));

export default router;
