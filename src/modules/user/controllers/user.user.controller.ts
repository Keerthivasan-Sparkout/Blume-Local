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
import { createAddressDto } from '../dto/create.address.dto';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get("/profile")
  async getProfile(@Request() req){
    return await this.userService.getProfile(req.user.sub)
  }
  
  @Get("/activeprogram")
  async getActiveProgram(@Request() req,){
    const result = await this.userService.activeProgramByUser(req.user.sub)
    return ResponseUtil.success("Active Programs",result)
  }

  @Post('/valid')
  async signup(@Request() req, @Body() users: any) {
    await this.userService.signupWithAuth0(req.user)
    .catch(err => { throw new UnauthorizedException() })
    const result = await this.userService.updateUserWithId(users)
    return ResponseUtil.success("Sigin successfully ",result)
  }

  @Patch("/personalinfo")
  getAllHeaders(@Request() req,@Body() user:UserUpdateDto) {
    return this.userService.updateUser(user,req.user.sub)
  }

  @Patch("/updateemail/:email")
  changeEmail(@Request() req,@Param('email') email:string) {
    return this.userService.changeEmail(req.user.sub,email)
  }

  @Patch("/:email/:product")
  addProductToCart(@Param('email') email:string,@Param('product') product:string){
      return this.userService.addProductToUserCart(email,product)
  }

  @Patch("/addprogram/:email/:program")
  addProgramToCart(@Param('email') email:string,@Param('program') program:string){
      return this.userService.addProgramToUserCart(email,program)
  }
  
}
