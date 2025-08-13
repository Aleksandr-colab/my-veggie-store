
import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box } from '@mantine/core';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { fetchProducts } from '../utils/fetchProducts';
import type { Product } from '../types/product';
import classes from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box className={classes.container}>
      <div className={classes.catalog}>Catalog</div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </SimpleGrid>
    </Box>
  );
};