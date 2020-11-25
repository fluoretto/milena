import express from "express";
import { body } from "express-validator";
import { getRefreshToken } from "@root/apis/v1/login/internal";
import { handleMissingArgsError, respond } from "@root/server/util";
import { CommonResponse, Module, PublicRequest } from "@root/types";
import { getUserForUid } from "@root/apis/v1/user";
import { getClaimer } from "@root/apis/v1/security";
import { verifyExchangeCode } from "@root/apis/v1/login/exchange";

const router = express.Router();

router.post(
  "/",
  [
    body("code").isString(),
    body("uid").isString(),
    handleMissingArgsError(Module.Login),
  ],
  async (req: PublicRequest, res: CommonResponse, next: any) => {
    const { code, uid } = req.body;

    try {
      const payload = await verifyExchangeCode(uid, code);
      const claimer = await getClaimer("milena");
      respond(
        res,
        await getRefreshToken(await getUserForUid(payload.uid), claimer)
      );
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
