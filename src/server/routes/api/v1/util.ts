import { getClaimer } from "@root/apis/v1/security";
import { CommonResponse, Module, PublicRequest, Service } from "@root/types";
import errors from "@root/types/errors";
import _ from "lodash";

export const putClaimer = (_property: string = "claimer") => async (
  req: PublicRequest,
  res: CommonResponse,
  next: any
) => {
  const claimerId = req.headers["claimer-id"];
  const claimerKey = req.headers["claimer-key"];

  if (
    !claimerId ||
    !claimerKey ||
    typeof claimerId !== "string" ||
    typeof claimerKey !== "string"
  ) {
    return next(
      new errors.IncorrectArgsError(
        "Missing claimer-id or claimer-key header",
        {
          originService: Service.Server,
          originModule: Module.Security,
        }
      )
    );
  }

  try {
    const claimer = await getClaimer(claimerId);
    if (!claimer) throw new Error("not found");

    const canGo = claimer.apiKey === claimerKey;

    if (!canGo) {
      return next(
        new errors.NoPermissionError("Claimer key do not match.", {
          originService: Service.Server,
          originModule: Module.Security,
        })
      );
    }

    _.set(req, _property, claimer);
  } catch {
    return next(
      new errors.NoPermissionError("Claimer not found.", {
        originService: Service.Server,
        originModule: Module.Security,
      })
    );
  }

  return next();
};
