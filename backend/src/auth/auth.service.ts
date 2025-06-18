import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Este método valida se a senha enviada é a mesma que está no banco
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Este método gera o token JWT se o usuário for válido
  async login(user: User) {
    const payload = { email: user.email, sub: user.id }; // 'sub' é o padrão para ID no JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}