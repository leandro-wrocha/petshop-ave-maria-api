import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  execute(userId: string): string {
    return sign({}, process.env.SECRET_KEY || "secretDevelop", {
      subject: userId,
      expiresIn: '2h'
    });
  }
}
