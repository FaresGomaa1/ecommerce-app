export interface IOrderAdd extends IBase {
  userId: string;
}
export interface IOrderResponse extends IOrder {
  userId: string;
}
export interface IOrder extends IBase {
  openingDate: Date;
  comments: string;
  status: string;
  id: number;
  closingDate: Date;
}
export interface IBase{
  invoiceNumber: string;
  addressId: number;
}
