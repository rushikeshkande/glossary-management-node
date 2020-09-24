import {
    Body, Controller, Get, Post, Res,
  } from '@nestjs/common';
  import { ApiOperation } from '@nestjs/swagger';
  import { Response } from 'express';
  import { UserService } from './user.service';
  import { AddUser, Login } from './user.dto';

  @Controller('user')
  export class UserController {
      constructor(private readonly userService: UserService) {}

      @Get('all-users')
      @ApiOperation({ title: 'Get users details' })
      async getAllUsers(@Res() res: Response): Promise<any> {
          const details = await this.userService.getUsers();
          res.json(details);
      }

      @Post('add-user')
      @ApiOperation({ title: 'Add new user' })
      async addStudent(@Res() res: Response, @Body() payload: AddUser): Promise<any> {
          const user = await this.userService.create(payload);
          res.status(200).json(user);
      }

      @Post('login')
      @ApiOperation({ title: 'user login'})
      async studentLogin(@Res() res:Response, @Body() payload: Login): Promise<any> {
          console.log(">>>>payload1111",payload);
          const loginResult = await this.userService.login(payload);
          res.status(200).json(loginResult);
      }
  }