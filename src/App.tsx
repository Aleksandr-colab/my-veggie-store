
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header/Header';
import { AppShell } from '@mantine/core';

function App() {
  return (
    <CartProvider>
      <AppShell padding="md">
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <HomePage />
        </AppShell.Main>
      </AppShell>
    </CartProvider>
  );
}

export default App;