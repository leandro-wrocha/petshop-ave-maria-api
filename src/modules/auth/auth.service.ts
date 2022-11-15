import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISignInDTO, IUserDTO, Role } from './dto/sign-in.dto';
import { IAuthService } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private prismaService: PrismaService) {}

  async signIn({ email, password }: ISignInDTO): Promise<IUserDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Email or password wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException(
        'Email or password wrong!',
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
