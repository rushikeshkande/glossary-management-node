import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../../shared/user.service';
import { Payload } from '../auth/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.JWT_SECRETE_TOKEN, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
