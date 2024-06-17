import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO, GenerateTokenDTO, UserDTO, createUserMapper, generateTokenMapper, userMapper } from '../dto';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    if (!AppDataSource.isInitialized) {
      AppDataSource.initialize().then(() => {
        this.userRepository = AppDataSource.getRepository(User);
      }).catch(error => {
        console.error('Error during Data Source initialization:', error);
      });
    } else {
      this.userRepository = AppDataSource.getRepository(User);
    }
  }

  async createUser(payload: CreateUserDTO): Promise<UserDTO> {
    const user = createUserMapper(payload);
    const savedUser = await this.userRepository.save(user);

    return userMapper(savedUser);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  generateJWT(user: User):  GenerateTokenDTO{
    const payload = {
      id: user.id,
      email: user.email,
      updatedAt: user.updatedAt,
      userType: user.userType,
    };
    
    return generateTokenMapper(jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24h' }), user);
  }
}
