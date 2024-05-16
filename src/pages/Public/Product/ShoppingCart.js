import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './shoppingCart.css';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification , setNotification] = useState(null)

  useEffect(() => {
    let newTotalPrice = 0;
    cartItems.forEach((item) => {
      const quantity = item.quantity || 1; // Assurer que la quantité n'est pas NaN
      newTotalPrice += item.price * quantity; // Calculer le prix total
    });
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    setNotification("Le site est en cours de développement. La fonctionnalité de commande n'est pas encore disponible."); // Message informatif
  };

  return (
    <div>
      <h2>Panier</h2>
      {notification && <p className="notification">{notification}</p>} {/* Afficher les notifications */}
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className='shopping-cart-container'>
          {cartItems.map((item) => (
            <div className='cart-item' key={item.id}>
              {/* Afficher les détails du produit */}
              <img
                className='product-image-panier'
                src={`http://localhost:4000/uploads/${item.images[0]}`}
                alt={item.title}
              />
              <div className='product-details'>
                <h3>{item.title}</h3>
                <p>Description: {item.description}</p>
                <p>Prix: {item.price} €</p>
                <p>Quantité: {item.quantity}</p>
              </div>
              <button
                className='remove-button'
                onClick={() => removeFromCart(item.id)}
              >
                Retirer
              </button>
            </div>
          ))}
          <p>Prix total: {totalPrice} €</p>
          <button onClick={clearCart}>Vider le panier</button>
          <button onClick={handlePlaceOrder}>Passer la commande</button> 
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
