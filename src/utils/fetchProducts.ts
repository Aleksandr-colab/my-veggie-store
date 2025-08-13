
import type { Product } from '../types/product'; 

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json' 
  );
  if (!response.ok) throw new Error('Ошибка при загрузке продуктов');
  return response.json();
}