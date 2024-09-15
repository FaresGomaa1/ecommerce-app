export interface IAddress extends IAddressAdd  {
  id: number;
}
export interface IAddressAdd  {
    country: string;
    addressLine: string;
    city: string;
    state: string;
}