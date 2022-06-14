import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Cryptos from './components/Cryptos/Cryptos';
import Header from './components/Layout/Header'
import CartProvider from './Store/CartProvider';

function App() {

  const [showCart, setshowCart] = useState(false);

  const invertShowCart = () => {
    setshowCart(!showCart);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClick={invertShowCart}/>}
      <Header onClick={invertShowCart}></Header>
      <Cryptos></Cryptos>
    </CartProvider>
  );
}

export default App;
