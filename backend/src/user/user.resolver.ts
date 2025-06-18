import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserModel } from './models/user.model';
import { Prisma } from '@prisma/client'; 
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel, { name: 'signUp' })
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    const userData: Prisma.UserCreateInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      telephones: {
        create: createUserInput.telephones,
      },
    };

    const user = await this.userService.create(userData);
    return user;
  }

  @Query(() => UserModel, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: UserModel) {
    return this.userService.findOneById(user.id);
  }
}