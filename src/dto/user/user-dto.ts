export class UserDTO {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  isEnable!: boolean;
  userType!: number;
  utcHoursOffset!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class CreateUserDTO {
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  isEnable!: boolean;
  userType!: number;
}

export class GenerateTokenDTO {
  jwt!: string;
  utcHoursOffset!: number;
  userType!: number;
  updatedAt!: Date;
}