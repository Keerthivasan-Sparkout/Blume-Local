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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get("/profile")
  async getProfile(@Request() req){
    const getUser = await this.userService.getProfile(req.user.sub)
    if(!getUser){
      return ResponseUtil.error("user not found")
    }
    return ResponseUtil.success("usr has found ",getUser)
  }
  
  @Get("/activeprogram")
  async getActiveProgram(@Request() req){
    const result = await this.userService.activeProgramByUser(req.user.sub)
    return ResponseUtil.success("Active Programs",result)
  }

  @Post('/signin')
  async signup(@Request() req, @Body() users: any) {
   let Check
    Check=await this.userService.signupWithAuth0(req.user)
    .catch(err => { throw new UnauthorizedException() })
    if(Check.isCheck==='exited'){
      return Check.data
    }
    const result = await this.userService.updateUserWithId(users).catch(err => { throw new UnauthorizedException() })
    return ResponseUtil.success("Sigin successfully ",result)
  }

  @Patch("/personalinfo")
  @ApiResponse({description:"updtae personal info"})
  getAllHeaders(@Request() req,@Body() user:UserUpdateDto) {
    return this.userService.updateUser(user,req.user.sub)
  }

  @Patch("/email/:email")
  changeEmail(@Request() req,@Param('email') email:string) {
    return this.userService.changeEmail(req.user.sub,email)
  }

  @Patch("/:email/:product")
  addProductToCart(@Param('email') email:string,@Param('product') product:string){
      return this.userService.addProductToUserCart(email,product)
  }

  @Patch("/program/:email/:program")
  addProgramToCart(@Param('email') email:string,@Param('program') program:string){
      return this.userService.addProgramToUserCart(email,program)
  }
  
}
