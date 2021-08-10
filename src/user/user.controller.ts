import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/new')
  async create(@Body() createUserDto: CreateUserDto){
    const user = await this.userService.createOne(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user
    };
  }

  @Get()
  async findAll(){
    const users =await this.userService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };

  }


  @Get('/:id')
  async findById(@Param('id') id: string){
    const data =await this.userService.findOneUser(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
