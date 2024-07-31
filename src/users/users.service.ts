import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";


@Injectable()
export class UsersService {

     constructor(
          @InjectModel(User)
          private readonly userModel: typeof User,
     ) { }

     async findByEmail(email: string): Promise<User> {
          return this.userModel.findOne({ where: { email } });
     }

     async findByPassword(password: string): Promise<User> {
          return this.userModel.findOne({ where: { password } });
     }

     async registerNewUser (params : any) {
          const checkExistingUser = await this.findByEmail(params.email)

          if(checkExistingUser){
               throw 'User Already Exists..'
          }
          return await this.userModel.create(params)
     }

}
