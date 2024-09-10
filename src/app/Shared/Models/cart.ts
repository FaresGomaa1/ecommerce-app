import { ICartAdd } from "../Interfaces/icart";

export class Cart implements ICartAdd {
  userId: string;
  colorId: number;
  sizeId: number;
  quantity: number;
  productId: number;

  constructor(
    userId: string,
    colorId: number,
    sizeId: number,
    quantity: number,
    productId: number
  ) {
    this.userId = userId;
    this.colorId = colorId;
    this.sizeId = sizeId;
    this.quantity = quantity;
    this.productId = productId;

    this.validateCartInputs();
  }

  // Centralized validation for clean code
  private validateCartInputs() {
    const validations = [
      { field: "Color ID", value: this.colorId },
      { field: "Size ID", value: this.sizeId },
      { field: "Quantity", value: this.quantity },
      { field: "Product ID", value: this.productId },
    ];

    validations.forEach(({ field, value }) => {
      if (value <= 0) {
        throw new Error(`${field} must be a positive number.`);
      }
    });
  }
}
