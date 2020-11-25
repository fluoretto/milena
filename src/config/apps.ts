import { Claimer } from "@root/entity/Claimer";
import { PermissionLevel } from "@root/types";

interface ClaimerBase {
  id: string;
  name: string;
  redirectUrl: string;
  permissionLevel: number;
  apiKey: string;
}

const claimers: ClaimerBase[] = [
  {
    id: "milena",
    name: "Milena",
    redirectUrl: "https://fluoretto.com/auth",
    permissionLevel: PermissionLevel.Milena.valueOf(),
    apiKey: "Milena is looking good today... As always.",
  },
];

export const getClaimers = () =>
  claimers.map((v) => {
    const claimer = new Claimer();

    claimer.id = v.id;
    claimer.name = v.name;
    claimer.isActive = true;
    claimer.redirectUrl = v.redirectUrl;
    claimer.permissionLevel = v.permissionLevel;
    claimer.apiKey = v.apiKey;

    return claimer;
  });
