import { Module, Service } from "@root/types";
import errors from "@root/types/errors";
import express from "express";
import { validationResult } from "express-validator";

export const respond = (
  res: typeof express.response,
  data: any,
  status: number = 200,
  ok: boolean = true
) => {
  res.status(status).json({
    status,
    data,
    ok,
  });
};

export const getIncorrectArgsError = (modu: Module, err: any) =>
  new errors.IncorrectArgsError("Missing or incorrect arguments for endpoint", {
    originModule: modu,
    originService: Service.Server,
    additionalContext: err,
  });

export const getIncorrectArgsLoginError = (err: any) =>
  getIncorrectArgsError(Module.Login, err);

export const handleMissingArgsError = (mod: Module) => (
  req: any,
  res: any,
  next: any
) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(getIncorrectArgsError(mod, err.array()));
  }

  next();
};
