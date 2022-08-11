import { Router } from "express";

import { RefreshTokenController } from "../../../../modules/auth/useCases/RefreshToken/RefreshTokenController";

const refreshTokenRoutes = Router();

const refreshTokenController = new RefreshTokenController();

refreshTokenRoutes.post('/', refreshTokenController.handle);

export { refreshTokenRoutes };
