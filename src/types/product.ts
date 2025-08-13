
export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  
  export interface ProductCardProps {
    product: Product;
  }