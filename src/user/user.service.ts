import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(id: string) {
    return {
      id: id,
    };
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const saltOrRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashpassword,
    });
    return newUser.save();
  }
}
