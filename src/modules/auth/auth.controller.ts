// COMPONENTS
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ISignInDTO, IUserDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() data: ISignInDTO): Promise<IUserDTO> {
    return await this.authService.signIn(data);
  }
}
