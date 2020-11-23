import { ApiModelProperty } from '@nestjs/swagger';

export class AddToCartDTO {
    @ApiModelProperty({ description: 'user ID'})
    userId: number;

    @ApiModelProperty({ description: 'product id'})
    productId: number;

    @ApiModelProperty({ description: 'product price'})
    price: number;

    @ApiModelProperty({ description: 'product old price'})
    oldPrice: number;

    @ApiModelProperty({ description: 'product name'})
    productName: string;

    @ApiModelProperty({ description: 'product discount'})
    discount: number;

    @ApiModelProperty({ description: 'product image'})
    productImage: string;
};

export class DeleteProductDTO {
    @ApiModelProperty({ description: 'user ID'})
    userId: number;

    @ApiModelProperty({ description: 'product id'})
    productId: number;
}