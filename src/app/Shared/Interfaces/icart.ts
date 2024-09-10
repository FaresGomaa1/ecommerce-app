export interface ICartAdd extends ICartBase {
  userId: string,
}
export interface ICart extends ICartBase  {
    id: number,
    productName: string,
    color: string,
    size: string,
    productPrice: number,
  }
  export interface ICartBase{
    colorId: number,
    sizeId: number,
    quantity: number,
    productId: number
  }