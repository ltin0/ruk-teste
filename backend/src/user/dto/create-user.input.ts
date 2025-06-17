import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class TelephoneInput {
  @Field()
  @IsString()
  number: string;

  @Field()
  @IsString()
  area_code: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field(() => [TelephoneInput])
  @ValidateNested({ each: true })
  @Type(() => TelephoneInput)
  telephones: TelephoneInput[];
}