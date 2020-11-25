import express from "express";
import { body } from "express-validator";
import { getRefreshToken, verifyLoginCode } from "@root/apis/v1/login/internal";
import { handleMissingArgsError, respond } from "@root/server/util";
import { CommonResponse, Module, PublicRequest } from "@root/types";
import { getOrCreateUserWithEmail } from "@root/apis/v1/user";
import { getDefaultClaimer } from "@root/apis/v1/security";

const router = express.Router();

router.post(
  "/",
  [
    body("email").isEmail(),
    body("words").isArray({ min: 4, max: 4 }),
    handleMissingArgsError(Module.Login),
  ],
  async (req: PublicRequest, res: CommonResponse, next: any) => {
    const email = req.body.email;
    const words = req.body.words as any[];

    try {
      await verifyLoginCode(email, words.join("-"));
      respond(
        res,
        await getRefreshToken(
          await getOrCreateUserWithEmail(email),
          await getDefaultClaimer()
        )
      );
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
