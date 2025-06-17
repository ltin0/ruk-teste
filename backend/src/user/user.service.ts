import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Telephone } from './entities/telephone.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password, telephones } = createUserInput;

    // Verifica se o e-mail já existe
    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new ConflictException('E-mail already in use');
    }

    const user = this.userRepository.create({
      name,
      email,
      password, // A senha será hasheada pelo hook @BeforeInsert na entidade
      telephones: telephones.map(t => Object.assign(new Telephone(), t)),
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error saving user to database');
    }
  }

  // Função para encontrar usuário por e-mail (será usada na autenticação)
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  
  // Função para encontrar usuário por ID (será usada na autenticação)
  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}