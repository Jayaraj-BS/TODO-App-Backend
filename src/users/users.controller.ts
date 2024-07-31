import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from 'src/dto/login.dto';
import { ResponseData } from 'src/dto/response-data';


@Controller('users')
export class UsersController {
     constructor (
          private userService : UsersService
     ) {}

     @Post('login')
     async loginUser(@Body() params : LoginDto){
          const output = new ResponseData()
          try {

               const userDetails = await this.userService.findByEmail(params.email);
               if (!userDetails) {
                    console.log(userDetails);
                    
                    throw 'User does not exist.';
               }
               
               const checkPassword = await this.userService.findByPassword(params.password);
               if (!checkPassword) {
                    console.log(checkPassword);
                    
                    throw 'Wrong Password Entered.';
               }
               
               if(userDetails && checkPassword){
                    console.log(userDetails, "andddd", checkPassword);
                    output.data = userDetails
               }
          } catch (error) {
               console.log(error);
               output.status = false;
               output.message = typeof error == 'string' ? error : '';
          }
          return output
     }

     @Post('register')
     async registerNewUser(@Body() params : any){
          const output = new ResponseData()
          try {
               await this.userService.registerNewUser(params)
          } catch (error) {
               console.log(error);
               output.status = false;
               output.message = typeof error == 'string' ? error : '';
          }
          return output
     }
}
