import {
  CommonResponse,
  Module,
  PermissionLevel,
  PrivateRequest,
  Service,
} from "@root/types";
import errors from "@root/types/errors";

export const hasPermission = (permission: PermissionLevel) => async (
  req: PrivateRequest,
  res: CommonResponse,
  next: any
) => {
  console.log("CLAIMER:", req.user);

  if (req.user.claimerId !== req.claimer.id) {
    return next(
      new errors.NoPermissionError("Claimer doesn't match token.", {
        originService: Service.Server,
        originModule: Module.Security,
      })
    );
  }

  const claimer = req.claimer;
  const canGo = (claimer.permissionLevel & permission.valueOf()) === 1;

  if (!canGo) {
    return next(
      new errors.NoPermissionError("Claimer doesn't have permission.", {
        originService: Service.Server,
        originModule: Module.Security,
      })
    );
  }

  return next();
};
