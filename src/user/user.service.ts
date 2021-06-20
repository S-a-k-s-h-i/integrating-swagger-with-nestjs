import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>
  ){}

  async createOne(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findAll():Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne(id);
    console.log(user)
    if(!user) throw new NotFoundException("USER NOT FOUND");
    return user

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({id});
    if(!user) throw new NotFoundException("USER NOT FOUND");
    if(updateUserDto.age) user.age = updateUserDto.age;
    if(updateUserDto.isActive) user.isActive = updateUserDto.isActive;

    await this.userRepo.update({id:user.id},updateUserDto);
    return {message:'USER_UPDATED_SUCCESSFULLY'}
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne({id});
    if(!user) throw new NotFoundException("USER NOT FOUND");
    try {
      await this.userRepo.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
