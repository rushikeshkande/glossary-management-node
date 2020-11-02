import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { UserService } from '../../shared/user.service';
import { Payload } from './auth.dto';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      email: user.email,
      id: user._id,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ title: 'user registration' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true })
  async register(@UploadedFile() file, @Body() userDTO: RegisterDTO) {
      const user = await this.userService.create(userDTO,file);
      const payload: Payload = {
        email: user.email,
        id: user._id,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
  }
}
