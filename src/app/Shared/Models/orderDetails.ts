import { IOrderDetails } from "../Interfaces/iorder-details";

export class OrderDetails implements IOrderDetails {
  productName: string;
  colorName: string;
  sizeName: string;
  price: number;
  orderId: number;
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;

  constructor(
    productName: string,
    colorName: string,
    sizeName: string,
    price: number,
    orderId: number,
    productId: number,
    colorId: number,
    sizeId: number,
    quantity: number
  ) {
    this.productName = productName;
    this.colorName = colorName;
    this.sizeName = sizeName;
    this.price = price;
    this.orderId = orderId;
    this.productId = productId;
    this.colorId = colorId;
    this.sizeId = sizeId;
    this.quantity = quantity;

    // Perform validation during object construction
    this.validateAllFields();
  }

  // Validation Methods

  /**
   * Validate product name (should not be empty)
   */
  validateProductName(): boolean {
    if (!this.productName || this.productName.trim() === '') {
      throw new Error('Product name cannot be empty.');
    }
    return true;
  }

  /**
   * Validate color name (should not be empty)
   */
  validateColorName(): boolean {
    if (!this.colorName || this.colorName.trim() === '') {
      throw new Error('Color name cannot be empty.');
    }
    return true;
  }

  /**
   * Validate size name (should not be empty)
   */
  validateSizeName(): boolean {
    if (!this.sizeName || this.sizeName.trim() === '') {
      throw new Error('Size name cannot be empty.');
    }
    return true;
  }

  /**
   * Validate price (should be a positive number)
   */
  validatePrice(): boolean {
    if (this.price <= 0) {
      throw new Error('Price must be a positive value.');
    }
    return true;
  }

  /**
   * Validate order ID (should be a positive integer)
   */
  validateOrderId(): boolean {
    if (this.orderId <= 0 || !Number.isInteger(this.orderId)) {
      throw new Error('Order ID must be a positive integer.');
    }
    return true;
  }

  /**
   * Validate product ID (should be a positive integer)
   */
  validateProductId(): boolean {
    if (this.productId <= 0 || !Number.isInteger(this.productId)) {
      throw new Error('Product ID must be a positive integer.');
    }
    return true;
  }

  /**
   * Validate color ID (should be a positive integer)
   */
  validateColorId(): boolean {
    if (this.colorId <= 0 || !Number.isInteger(this.colorId)) {
      throw new Error('Color ID must be a positive integer.');
    }
    return true;
  }

  /**
   * Validate size ID (should be a positive integer)
   */
  validateSizeId(): boolean {
    if (this.sizeId <= 0 || !Number.isInteger(this.sizeId)) {
      throw new Error('Size ID must be a positive integer.');
    }
    return true;
  }

  /**
   * Validate quantity (should be a positive integer)
   */
  validateQuantity(): boolean {
    if (this.quantity <= 0 || !Number.isInteger(this.quantity)) {
      throw new Error('Quantity must be a positive integer.');
    }
    return true;
  }

  /**
   * Perform validation on all fields
   */
  validateAllFields(): boolean {
    this.validateProductName();
    this.validateColorName();
    this.validateSizeName();
    this.validatePrice();
    this.validateOrderId();
    this.validateProductId();
    this.validateColorId();
    this.validateSizeId();
    this.validateQuantity();

    return true;
  }
}