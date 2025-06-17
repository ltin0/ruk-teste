import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Verifique o nome do seu arquivo guard
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'signUp' })
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.userService.create(createUserInput);
    // O desafio pede para retornar apenas id, created_at e modified_at no êxito
    return {
      id: user.id,
      created_at: user.created_at,
      modified_at: user.modified_at,
    } as User;
  }

  // ESSA PARTE RESOLVE O ERRO
  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard) // Protege a rota, exigindo um token JWT válido
  me(@CurrentUser() user: User) {
    // Retorna os dados do usuário que o Guard (JwtStrategy) identificou no token
    return this.userService.findOneById(user.id);
  }
}