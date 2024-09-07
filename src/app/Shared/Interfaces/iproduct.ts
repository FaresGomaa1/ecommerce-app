// Base interface for common product properties
export interface IBaseProduct {
    id: number;
    name: string;
    price: number;
    averageRating: number;
}

// Interface for a product with basic details
export interface IProduct extends IBaseProduct {
    category: string;
    photoUrl: string;
    
}

// Interface for detailed product information
export interface IProductDetails extends IBaseProduct {
    description: string;
    photos: string[];
    colorsAndSizesAndQuantity: IColorsAndSizesAndQuantity[];
    isRatedByUser: boolean;
}

// Interface for colors, sizes, and quantity
export interface IColorsAndSizesAndQuantity {
    colorName: string;
    sizeName: string;
    quantity: number;
}
