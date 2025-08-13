
import React, { useState } from 'react';
import { useCartHook } from '../../hooks/useCart';
import { ShoppingCart } from 'tabler-icons-react';
import { Popover} from '@mantine/core';
import { CartPopover } from '../CartPopover/CartPopover'; 
import classes from './Header.module.css';

export const Header: React.FC = () => {
  const { totalItems } = useCartHook();
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
      
        <span>Vegetable</span>
        <span className={classes.shop}>SHOP</span>
      </div>

      <Popover
        opened={popoverOpen}
        onChange={setPopoverOpen}
        position="bottom-end"
        width={444}
      >
        {/* Оберните кнопку в Target */}
        <Popover.Target>
          <button
            className={classes.cartButton}
            type="button"
            onClick={() => setPopoverOpen(!popoverOpen)} 
          >
            {totalItems > 0 && (
              <span className={classes.counterBadge}>{totalItems}</span>
            )}
            <span className={classes.cartText}>Cart</span>
            <ShoppingCart size={20} color="white" />
          </button>
        </Popover.Target>

        <Popover.Dropdown>
          <CartPopover opened={popoverOpen} onClose={() => setPopoverOpen(false)} />
        </Popover.Dropdown>
      </Popover>
    </header>
  );
};