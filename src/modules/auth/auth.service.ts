import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ISignInDTO, IUserDTO, Role } from './dto/sign-in.dto';
import { IAuthService } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  private readonly prisma: PrismaClient;

  async signIn({ email, password }: ISignInDTO): Promise<IUserDTO> {
    console.log('oka');
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log('ko');

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new HttpException(
        'User or password wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roleName: user.roleName as Role['role'],
    };
  }
}
