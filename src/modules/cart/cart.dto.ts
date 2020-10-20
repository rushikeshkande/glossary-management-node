import { ApiModelProperty } from '@nestjs/swagger';

export class AddToCartDTO {
    @ApiModelProperty({ description: 'user ID'})
    userId: number;

    @ApiModelProperty({ description: 'product price'})
    price: number;

    @ApiModelProperty({ description: 'product id'})
    productId: number;

    @ApiModelProperty({ description: 'product quantity'})
    quantity: number;

    @ApiModelProperty({ description: 'product discount'})
    discount: number;

    @ApiModelProperty({ description: 'is product in cart active ?'})
    isActive: boolean;
};

export class UpdateQuantityDTO {
    @ApiModelProperty({ description: 'user ID'})
    userId: number;

    @ApiModelProperty({ description: 'product id'})
    productId: number;

    @ApiModelProperty({ description: 'product quantity'})
    quantity: number;
}

export class DeleteProductDTO {
    @ApiModelProperty({ description: 'user ID'})
    userId: number;

    @ApiModelProperty({ description: 'product id'})
    productId: number;
}