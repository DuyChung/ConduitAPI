import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from './dtos/user-request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: UserRequestDto) {
    return this.usersService.createUser(body);
  }
}