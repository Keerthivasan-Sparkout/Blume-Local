import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ResponseUtil } from 'src/common/utils/response.utils';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDto } from '../dto/upadate.user.dto';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

   @UseGuards(AuthGuard('jwt'))
  @Post('/valid')
  async getProfile(@Request() req, @Body() users: any) {
    await this.userService.signupWithAuth0(req.user)
    .catch(err => { throw new UnauthorizedException() })
    const result = await this.userService.updateUserWithId(users)
    return ResponseUtil.success("Sigin successfully ",result)
  }

  @Patch()
  getAllHeaders(@Body() user:UserUpdateDto) {
    return this.userService.updateUser(user,user.email)
  }


  @Patch("/:email/:product")
  addProductToCart(@Param('email') email:string,@Param('product') product:string){
      return this.userService.addProductToUserCart(email,product)
  }

  @Patch("/addprogram/:email/:program")
  addProgramToCart(@Param('email') email:string,@Param('program') program:string){
      return this.userService.addProgramToUserCart(email,program)
  }

  @Get("/activeprogram/:email")
  async getActiveProgram(@Param('email') email:string){
    const result = await this.userService.activeProgramByUser(email)
    return ResponseUtil.success("Active Programs",result)
  }
}
