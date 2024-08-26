import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/createuser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('signup')
  async createuser(@Body() userdeatils: CreateUserDto): Promise<CreateUserDto> {
    return this.userservice.createuser(
      userdeatils.user_name,
      userdeatils.email,
      userdeatils.password,
    );
  }

  @Post('login')
  async userlogin(
    @Body() email: string,
    password: string,
  ): Promise<CreateUserDto> {
    const temp = { email, password };
    return this.userservice.userlogin(email);
  }

  @Post('logout/:id')
  async deleteuser(@Param('id') user_id: number): Promise<any> {
    return await this.userservice.deleteuser(user_id);
  }

  @Get('get-task-by-user_id/:id')
  async gettaskbyuserid(@Param('id') id: number) {
    return this.userservice.gettaskbyuserid(id);
  }
}
