import { RefreshToken } from "@prisma/client";

export interface IAuthRepository {
  signIn(username: string): Promise<{ token: string, refreshToken: RefreshToken }>;
  refreshToken(id: string): Promise<string>;
}