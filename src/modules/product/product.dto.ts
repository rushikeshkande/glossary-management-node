import { ApiModelProperty } from '@nestjs/swagger';

export class AddProduct {
    @ApiModelProperty({ description: 'product name'})
    name: string;

    @ApiModelProperty({ description: 'product quantity'})
    quantity: number;

    @ApiModelProperty({ description: 'product size'})
    size: string;

    @ApiModelProperty({ description: 'product color'})
    color: string;

    @ApiModelProperty({ description: 'product image' })
    productImage: string;

    @ApiModelProperty({ description: 'product price'})
    price: number;

    @ApiModelProperty({ description: "product discount"})
    discount: number;

    @ApiModelProperty({ description:"product old price"})
    oldPrice: number;
}