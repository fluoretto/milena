import express from "express";
import { body } from "express-validator";
import { handleMissingArgsError, respond } from "@root/server/util";
import { CommonResponse, Module, PublicRequest } from "@root/types";
import { sendLoginCodeEmail } from "@root/apis/v1/email";
import { createLoginCode } from "@root/apis/v1/login/internal";

const router = express.Router();

router.post(
  "/",
  [body("email").isEmail(), handleMissingArgsError(Module.Login)],
  async (req: PublicRequest, res: CommonResponse) => {
    const email = req.body.email;
    const token = await createLoginCode(email);
    await sendLoginCodeEmail(email, token.code);
    respond(res, {});
  }
);

export default router;
