import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginInput } from './dto/login.input';


@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // ESTE É O DECORATOR QUE REGISTRA A MUTAÇÃO NO GRAPHQL
  @Mutation(() => LoginResponse, { name: 'signIn' })
  async signIn(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Se o usuário for válido, o AuthService gera e retorna o token
    return this.authService.login(user);
  }
}