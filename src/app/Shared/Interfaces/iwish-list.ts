export interface IWishList {
    userId:string,
    productId:number
}
export interface IWishListGet {
    id: number,
    categoryName: string,
    productName: string,
    productId: number,
    price: number,
    rate: number
}
