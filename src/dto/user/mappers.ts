import { User } from '../../entity/User';
import { CreateUserDTO, GenerateTokenDTO, UserDTO } from './user-dto';

export function createUserMapper(createUserDTO: CreateUserDTO): User {
  const user = new User();
  user.email = createUserDTO.email;
  user.password = createUserDTO.password;
  user.firstName = createUserDTO.firstName;
  user.lastName = createUserDTO.lastName;
  user.userType = createUserDTO.userType ?? 0;
  user.isEnable = createUserDTO.isEnable ?? true;

  return user;
}

export function userMapper(user: User): UserDTO {
  const userDTO = new UserDTO();
  userDTO.id = user.id;
  userDTO.email = user.email;
  userDTO.firstName = user.firstName;
  userDTO.lastName = user.lastName;
  userDTO.isEnable = user.isEnable;
  userDTO.userType = user.userType;
  userDTO.utcHoursOffset = user.utcHoursOffset;
  userDTO.createdAt = user.createdAt;
  userDTO.updatedAt = user.updatedAt;

  return userDTO;
}

export function generateTokenMapper(token: string, user: User): GenerateTokenDTO{
  const tokenDTO = new GenerateTokenDTO()
  tokenDTO.jwt = token;
  tokenDTO.utcHoursOffset = user.utcHoursOffset;
  tokenDTO.userType = user.userType;
  tokenDTO.updatedAt = user.updatedAt;

  return tokenDTO
}