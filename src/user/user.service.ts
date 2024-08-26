import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/dto/createuser.dto';
import { UserModel } from 'src/entity/user.entity';
import { jwtConstants } from './constants';
import { StoreTokenModel } from 'src/entity/storetoken.entity';
import { TodoModel } from 'src/entity/todo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private usermodel: typeof UserModel,
    @InjectModel(StoreTokenModel) private tokenmodel: typeof StoreTokenModel,
    @InjectModel(TodoModel) private todomodel:typeof TodoModel,
    private jwtservice: JwtService,
  ) {}

  async createuser(
    user_name: string,
    email: string,
    password: string,
  ): Promise<CreateUserDto> {
    // const salt = await genSaltSync(10);
    const hasspassword = await hashSync(password, genSaltSync(10));
    let temp = { user_name, email, password: hasspassword };
    const user = await this.usermodel.create(temp);
    return user;
  }

  async userlogin(temp): Promise<any> {
    const user = await this.usermodel.findOne({
      where: { email: temp.email },
    });
    // console.log(user);
    if (!user) {
      throw new BadRequestException('user not found!');
    }
    const check = await compareSync(temp.password, user.password);
    if (!check) {
      throw new BadRequestException('incorrect password!');
    }
    const payload = {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
    };

    const accesstoken = await this.jwtservice.signAsync(payload, {
      expiresIn: '1d',
      secret: jwtConstants.secret,
    });

    const accesstoken_expire = new Date();
    accesstoken_expire.setDate(accesstoken_expire.getDate() + 1);

    const refreshtoken = await this.jwtservice.signAsync(payload, {
      expiresIn: '5d',
      secret: jwtConstants.secret,
    });

    const refreshtoken_expire = new Date();
    refreshtoken_expire.setDate(refreshtoken_expire.getDate() + 5);

    const user_id = user.id;
    const data = {
      accesstoken,
      accesstoken_expire,
      refreshtoken,
      refreshtoken_expire,
      user_id,
    };
    await this.storetoken(data);

    const decode = await this.jwtservice.decode(accesstoken);
    // console.log(decode)
    const verify = await this.usermodel.findOne({
      where: { id: decode.id, is_deleted: false },
    });
    if (!verify) {
      throw new BadRequestException('unauthorized user');
    }
    return 'authoried user';
  }

  async storetoken(data): Promise<StoreTokenModel> {
    return await this.tokenmodel.create(data);
  }

  async deleteuser(user_id: number) {
    const finduser = await this.tokenmodel.findOne({
      where: { user_id: user_id },
    });
    const removetoken = await this.tokenmodel.destroy({
      where: { user_id },
      force: true,
    });

    return 'logout successfully';
  }


  async gettaskbyuserid(id: number) {
    console.log(id)
    const data = await this.usermodel.findOne({
     where:{id:id},
     attributes:['id','user_name','email','password'],
     include:{association:"todotable", attributes: [
      'tittle',
      'task',
      'task_creation_date',
      'last_date',
      'is_completed',
    ],},
    
    });
    return data
  }
}
