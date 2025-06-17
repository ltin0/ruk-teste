import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { Telephone } from './entities/telephone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Telephone])], // Importa os repositórios
  providers: [UserResolver, UserService],
  exports: [UserService], // Exporte o serviço para ser usado no Módulo de Auth
})
export class UserModule {}