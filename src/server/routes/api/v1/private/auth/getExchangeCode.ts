import express from "express";
import { query } from "express-validator";
import { handleMissingArgsError, respond } from "@root/server/util";
import {
  CommonResponse,
  Module,
  PermissionLevel,
  PrivateRequest,
} from "@root/types";
import { getClaimer } from "@root/apis/v1/security";
import { createExchangeToken } from "@root/apis/v1/login/exchange";
import { hasPermission } from "../util";

const router = express.Router();

router.get(
  "/",
  [handleMissingArgsError(Module.Login), hasPermission(PermissionLevel.Milena)],
  async (req: PrivateRequest, res: CommonResponse, next: any) => {
    const claimer = req.claimer;

    try {
      respond(res, await createExchangeToken(req.user.userId, claimer));
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
