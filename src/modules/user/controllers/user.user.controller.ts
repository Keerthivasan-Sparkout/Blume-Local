import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { ResponseUtil } from 'src/common/utils/response.utils';
import { ForgetPasswordDto } from '../dto/forget.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

   @UseGuards(AuthGuard('jwt'))
  @Post('/valid')
  async getProfile(@Request() req, @Body() users: any) {
    console.log("dummy")
    await this.userService.signupWithAuth0(req.user)
    .catch(err => { throw new UnauthorizedException() })
    const result = await this.userService.updateUser(users)
    return ResponseUtil.success("Sigin successfully ",result)

  }

  @Get('all')
  getAllHeaders() {
    console.log("success")
    return "success"
  }

}
