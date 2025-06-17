import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Telephone } from './telephone.entity';
import * as bcrypt from 'bcrypt';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column() // A senha não terá um @Field(), pois não deve ser exposta na API
  password: string;

  @Field(() => [Telephone], { nullable: true })
  @OneToMany(() => Telephone, telephone => telephone.user, { cascade: true, eager: true })
  telephones: Telephone[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  modified_at: Date;

  // Este hook do TypeORM roda ANTES de um novo usuário ser inserido no banco
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}