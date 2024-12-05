export class Product {
    idProduct!: number;
    nameProduct!: string;
    descriptionProduct!: string | null;
    manufacturer!: string;
    qty!: number;
    priceProduct!: number;
    productImage!: string | null;
}

export class ProductToServer {
    idProduct!: number;
    nameProduct!: string;
    descriptionProduct!: string | null;
    manufacturer!: string;
    qty!: number;
    priceProduct!: number;
    productImage!: File;
}