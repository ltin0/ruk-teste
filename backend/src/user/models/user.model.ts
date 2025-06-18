import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TelephoneModel {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  area_code: string;
}

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [TelephoneModel], { nullable: 'itemsAndList' })
  telephones?: TelephoneModel[];

  @Field()
  created_at: Date;

  @Field()
  modified_at: Date;
}