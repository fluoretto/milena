import { Claimer } from "@root/entity/Claimer";
import { getDatabase } from "@root/services/typeorm";
import { getAsync, setWithExpiryAsync } from "@root/services/redis";

export async function getClaimer(id: string, noCache?: boolean) {
  if (!noCache) {
    const cached = await getAsync(`cached_claimers/${id}`);

    if (cached) {
      return JSON.parse(cached) as Claimer;
    }
  }

  const claimerRepo = getDatabase().getRepository(Claimer);
  const obj = await claimerRepo.findOne({ id });
  await setWithExpiryAsync(`cached_claimers/${id}`, JSON.stringify(obj), 600);
}

export async function getDefaultClaimer() {
  return getClaimer("milena");
}
