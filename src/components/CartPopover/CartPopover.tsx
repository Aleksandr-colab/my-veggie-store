
import React from 'react';
import {
  Popover,
  Box,
  Text,
  Button,
  Image,
} from '@mantine/core';
import { useCartHook } from '../../hooks/useCart';
import { X } from 'tabler-icons-react';
import classes from './CartPopover.module.css';

interface CartPopoverProps {
  opened: boolean;
  onClose: () => void;
}

export const CartPopover: React.FC<CartPopoverProps> = ({ opened, onClose }) => {
  const { cartItems, totalPrice, updateQuantity } = useCartHook();

  return (
    <Popover
      opened={opened}
      onClose={onClose}
      position="bottom-end"
      withArrow={false}
      width={444}
      shadow="md"
      classNames={{ dropdown: classes.popover }}
    >
      <Box className={classes.header}>
        <Text fw={700} size="lg">Your Cart</Text>
        <Button
          variant="subtle"
          p={0}
          onClick={onClose}
          rightSection={<X size={18} />}
          className={classes.closeButton}
        >
          Close
        </Button>
      </Box>

      {cartItems.length === 0 ? (
        <Box className={classes.empty}>
          <Image
            src="../../public/cart_content.svg"
            alt="Empty cart"
            className={classes.emptyImage}
          />
         
          <Button
            bg="#54B46A"
            c="white"
            style={{ borderRadius: 8 }}
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Box key={item.id} className={classes.item}>
              <img
                src={item.image}
                alt={item.name}
                className={classes.itemImage}
              />
              <div className={classes.itemInfo}>
                <Text className={classes.itemName}>{item.name}</Text>
                <Text className={classes.itemPrice}>${item.price}</Text>
              </div>

              <div className={classes.qtyGroup}>
                <button
                  className={classes.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  type="button"
                >
                  −
                </button>
                <span className={classes.badge}>{item.quantity}</span>
                <button
                  className={classes.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </Box>
          ))}

          <div className={classes.divider} />
          <div className={classes.total}>
            <Text>Total:</Text>
            <Text>${totalPrice}</Text>
          </div>
        </Box>
      )}
    </Popover>
  );
};