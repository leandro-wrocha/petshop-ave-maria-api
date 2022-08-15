import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";

import { GenerateTokenProvider } from "./GenerateTokenProvider";

describe("GenerateTokenProvider", () => {
  it("should be generate an token", async () => {
    const generateTokenProvider = new GenerateTokenProvider();
    const token = generateTokenProvider.execute(randomUUID());

    expect(
      verify(token, process.env.SECRET_KEY || "secretDevelop")
    ).toBeTruthy();
  });
});
