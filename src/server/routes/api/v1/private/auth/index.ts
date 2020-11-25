import express from "express";

import getExchangeCode from "./getExchangeCode";

const router = express.Router();

router.use("/getExchangeCode", getExchangeCode);

export default router;
