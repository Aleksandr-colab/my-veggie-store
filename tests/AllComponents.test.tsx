
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../src/components/ProductCard/ProductCard';
import { Header } from '../src/components/Header/Header';
import { HomePage } from '../src/pages/HomePage';
import { CartPopover } from '../src/components/CartPopover/CartPopover';
import { CartProvider } from '../src/context/CartContext';
import { useCartHook } from '../src/hooks/useCart';
import type { Product } from '../src/types/product';


jest.mock('../hooks/useCart');
jest.mock('../utils/fetchProducts', () => ({
  fetchProducts: () =>
    Promise.resolve([
      {
        id: 1,
        name: 'Broccoli - 1 Kg',
        price: 120,
        image: 'broccoli.jpg',
        category: 'vegetables',
      },
    ]),
}));


const renderWithProvider = (ui: React.ReactNode) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('Все компоненты приложения', () => {

  describe('ProductCard', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Broccoli - 1 Kg',
      price: 120,
      image: 'broccoli.jpg',
      category: 'vegetables',
    };

    test('отображает название, вес и цену', () => {
      const mockAddToCart = jest.fn();
      (useCartHook as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });

      renderWithProvider(<ProductCard product={mockProduct} />);

      const [name] = mockProduct.name.split(' - ');
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText('1 Kg')).toBeInTheDocument();
      expect(screen.getByText('$120')).toBeInTheDocument();
    });

    test('вызывает addToCart при клике на кнопку', () => {
      const mockAddToCart = jest.fn();
      (useCartHook as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });

      renderWithProvider(<ProductCard product={mockProduct} />);

      const button = screen.getByRole('button', { name: /Add to Cart/i });
      fireEvent.click(button);

      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    });

    test('изменяет количество при клике на + и −', () => {
      const mockAddToCart = jest.fn();
      (useCartHook as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });

      renderWithProvider(<ProductCard product={mockProduct} />);

      const increaseBtn = screen.getByRole('button', { name: '+' });
      const decreaseBtn = screen.getByRole('button', { name: '−' });

      fireEvent.click(increaseBtn);
      fireEvent.click(increaseBtn);
      fireEvent.click(decreaseBtn);

      const addToCartBtn = screen.getByRole('button', { name: /Add to Cart/i });
      fireEvent.click(addToCartBtn);

      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
    });
  });

 
  describe('Header', () => {
    test('отображает логотип и кнопку Cart', () => {
      (useCartHook as jest.Mock).mockReturnValue({ totalItems: 0 });

      renderWithProvider(<Header />);

      expect(screen.getByText('Vegetable')).toBeInTheDocument();
      expect(screen.getByText('SHOP')).toBeInTheDocument();
      expect(screen.getByText('Cart')).toBeInTheDocument();
    });

    test('отображает счётчик при наличии товаров', () => {
      (useCartHook as jest.Mock).mockReturnValue({ totalItems: 3 });

      renderWithProvider(<Header />);

      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });


  describe('CartPopover', () => {
    test('показывает сообщение при пустой корзине', () => {
      (useCartHook as jest.Mock).mockReturnValue({
        cartItems: [],
        totalPrice: 0,
        updateQuantity: jest.fn(),
      });

      renderWithProvider(<CartPopover opened={true} onClose={() => {}} />);

      expect(screen.getByText('You cart is empty!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Continue Shopping/i })).toBeInTheDocument();
    });

    test('отображает товары и общую стоимость', () => {
      const mockUpdateQuantity = jest.fn();
      const mockItem = {
        id: 1,
        name: 'Apple - 1 Kg',
        price: 50,
        image: 'apple.jpg',
        quantity: 2,
      };

      (useCartHook as jest.Mock).mockReturnValue({
        cartItems: [mockItem],
        totalPrice: 100,
        updateQuantity: mockUpdateQuantity,
      });

      renderWithProvider(<CartPopover opened={true} onClose={() => {}} />);

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('1 Kg')).toBeInTheDocument();
      expect(screen.getByText('$50')).toBeInTheDocument();
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });

    test('вызывает updateQuantity при клике на + и −', () => {
      const mockUpdateQuantity = jest.fn();
      const mockItem = {
        id: 1,
        name: 'Apple - 1 Kg',
        price: 50,
        image: 'apple.jpg',
        quantity: 1,
      };

      (useCartHook as jest.Mock).mockReturnValue({
        cartItems: [mockItem],
        totalPrice: 50,
        updateQuantity: mockUpdateQuantity,
      });

      renderWithProvider(<CartPopover opened={true} onClose={() => {}} />);

      const increaseBtn = screen.getByRole('button', { name: '+' });
      const decreaseBtn = screen.getByRole('button', { name: '−' });

      fireEvent.click(increaseBtn);
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);

      fireEvent.click(decreaseBtn);
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
    });
  });


  describe('HomePage', () => {
    test('отображает надпись Catalog и карточки товаров', async () => {
      (useCartHook as jest.Mock).mockReturnValue({ totalItems: 0 });

      renderWithProvider(<HomePage />);

      expect(screen.getByText('Catalog')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Broccoli')).toBeInTheDocument();
      });
    });
  });
});