import { ApiModelProperty } from '@nestjs/swagger';

export class AddUser {
    @ApiModelProperty({ description: 'user first name'})
    firstName: string;

    @ApiModelProperty({ description: 'user last name'})
    lastName: number;

    @ApiModelProperty({ description: 'user store name'})
    storeName: string;

    @ApiModelProperty({ description: 'user mail id'})
    email: string;

    @ApiModelProperty({ description: 'user contact number'})
    contactNo: string;

    @ApiModelProperty({ description: 'user username' })
    username: string;

    @ApiModelProperty({ description: 'user password'})
    password: string;

    @ApiModelProperty({ description: 'user profile URL'})
    profileURL: string;

    @ApiModelProperty({ description: 'GST no.'})
    GSTNO: string;

    @ApiModelProperty({ description: 'PAN no.'})
    PAN: string;

    @ApiModelProperty({ description: 'store user id'})
    userid: number;

    @ApiModelProperty({ description: 'store id'})
    storeid: number;

    @ApiModelProperty({ description: 'aadhar no.'})
    aadharNo: string;
}

export class Login {
    @ApiModelProperty({ description: 'username' })
    username: string;

    @ApiModelProperty({ description: 'password'})
    password: string;
}

export class DeleteUser {
    @ApiModelProperty({ description: "user id"})
    userid: number
}