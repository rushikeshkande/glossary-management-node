import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiModelProperty({ description: 'user email', required: true })
  email: string;

  @ApiModelProperty({ description: 'user password', required: true })
  password: string;
}

export class RegisterDTO {
  @ApiModelProperty({ description: 'user first name', required: true })
  firstName: string;

  @ApiModelProperty({ description: "user last name", required: true })
  lastName: string;

  @ApiModelProperty({ description: 'user email', required: true})
  email: string;

  @ApiModelProperty({ description: 'user password', required: true})
  password: string;

  @ApiModelProperty({ description: 'user contact no.', required: true})
  contactNo: number;

  @ApiModelProperty({ description: 'user profile URL', required: true})
  profile: string;
}

export interface Payload {
  email: string;
  id: string;
}
