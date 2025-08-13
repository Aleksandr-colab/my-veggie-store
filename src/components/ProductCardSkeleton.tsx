
import classes from './ProductCardSkeleton.module.css';

export const ProductCardSkeleton = () => {
  return (
    <div className={classes.card}>
      <div className={classes.image} />
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.text}>
            <div className={classes.name} />
            <div className={classes.weight} />
          </div>
          <div className={classes.qtyGroup}>
            <div className={classes.qtyBtn} />
            <div className={classes.badge} />
            <div className={classes.qtyBtn} />
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.price} />
          <div className={classes.addToCart} />
        </div>
      </div>
    </div>
  );
};