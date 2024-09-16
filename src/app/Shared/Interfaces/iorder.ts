export interface IOrderAdd {
  invoiceNumber: string,
  addressId: number,
  userId: string
}
export interface IOrderResponse extends IOrderAdd {
  openingDate: Date,
  closingDate: Date,
  comments: string,
  status: string,
  id: number
}
