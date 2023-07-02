import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './interface/user.interface';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async findOneWithUserName(name: string) {
    return await this.userModel.findOne({ email: name });
  }
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { password } = createUserDto;
    const saltOrRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashpassword,
    });
    return newUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }
}
