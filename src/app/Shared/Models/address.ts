import { IAddressAdd } from "../Interfaces/iaddress";

export class Address implements IAddressAdd {
  country: string;
  addressLine: string;
  city: string;
  state: string;

  constructor(country: string, addressLine: string, city: string, state: string) {
    this.country = country;
    this.addressLine = addressLine;
    this.city = city;
    this.state = state;
  }
}
