import { ApiModelProperty } from '@nestjs/swagger';

export class AddUser {
    @ApiModelProperty({ description: 'user first name'})
    firstName: string;

    @ApiModelProperty({ description: 'user last name'})
    lastName: number;

    @ApiModelProperty({ description: 'user mail id'})
    email: string;

    @ApiModelProperty({ description: 'user contact number'})
    contactNo: string;

    @ApiModelProperty({ description: 'user username' })
    username: string;

    @ApiModelProperty({ description: 'user password'})
    password: string;
}

export class Login {
    @ApiModelProperty({ description: 'username' })
    username: string;

    @ApiModelProperty({ description: 'password'})
    password: string;
}

export class DeleteUser {
    @ApiModelProperty({ description: "user id"})
    username: string
}