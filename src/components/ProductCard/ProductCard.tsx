
import { useState } from 'react';
import { useCartHook } from '../../hooks/useCart';
import type { Product } from '../../types/product';
import { ShoppingCart } from 'tabler-icons-react';
import classes from './ProductCard.module.css';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCartHook();
  const [quantity, setQuantity] = useState<number>(1);

  const [productName, productWeight] = product.name.split(' - ');

  return (
    <div className={classes.card}>
      <img src={product.image} alt={product.name} className={classes.image} />

      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.text}>
            <h3 className={classes.name}>{productName}</h3>
            <span className={classes.weight}>{productWeight}</span>
          </div>

          <div className={classes.qtyGroup}>
            <button
              className={classes.qtyBtn}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              type="button"
            >
              −
            </button>
            <span className={classes.badge}>{quantity}</span>
            <button
              className={classes.qtyBtn}
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className={classes.footer}>
          <span className={classes.price}>${product.price}</span>

          <button
            className={classes.addToCart}
            onClick={() => addToCart(product, quantity)}
            type="button"
          >
            Add to Cart
            <ShoppingCart size={16} color="#3B944E" />
          </button>
        </div>
      </div>
    </div>
  );
};