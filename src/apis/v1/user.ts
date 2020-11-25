import { Claimer } from "@root/entity/Claimer";
import { RefreshToken } from "@root/entity/RefreshToken";
import { User } from "@root/entity/User";
import { getDatabase } from "@root/services/typeorm";

function getUserForEmail(email: string) {
  const userRepo = getDatabase().getRepository(User);

  return userRepo.findOne({
    where: {
      email: email,
    },
  });
}

function createUserForEmail(email: string) {
  const userRepo = getDatabase().getRepository(User);

  const user = new User();

  user.email = email;
  user.isActive = true;

  return userRepo.save(user);
}

export function getUserForUid(uid: string) {
  const userRepo = getDatabase().getRepository(User);

  return userRepo.findOne({
    where: {
      id: uid,
    },
  });
}

export function createRefreshTokenForUser(user: User, claimer: Claimer) {
  const tokenRepo = getDatabase().getRepository(RefreshToken);
  const token = new RefreshToken();

  token.isActive = true;
  token.user = user;
  token.claimer = claimer;

  return tokenRepo.save(token);
}

export async function getOrCreateUserWithEmail(email: string) {
  let user = await getUserForEmail(email);

  if (user) return user;

  return await createUserForEmail(email);
}
