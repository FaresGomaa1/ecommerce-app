export interface IOrderDetails extends IOrderDetailsBase {
  productId: number;
  colorId: number;
  sizeId: number;
}

export interface IOrderDetailResponse {
  message: string;
  failedItems: IFailedOrderItem[];
}

export interface IFailedOrderItem extends IOrderDetailsBase {
  order: null;
  id: number;
}
export interface IOrderDetailsBase {
  productName: string;
  colorName: string;
  sizeName: string;
  quantity: number;
  price: number;
  orderId: number;
}
export interface IOrderDetais extends IOrderDetailsBase {
  id: number;
}
