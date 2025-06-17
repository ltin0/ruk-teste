import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Telephone {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  number: string;

  @Field()
  @Column()
  area_code: string;

  // Define a relação: Muitos telefones pertencem a Um usuário
  @ManyToOne(() => User, user => user.telephones)
  user: User;
}