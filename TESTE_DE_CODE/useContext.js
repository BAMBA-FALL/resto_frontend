//Premier fichier à mettre en place 


import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId, quantity) => {
    // Ajouter la logique pour ajouter au panier
    setCart(prevCart => [
      ...prevCart,
      { productId, quantity }
    ]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};


//ici le deuxième fichier à mettre en place

import React, { useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';

const AddToCart = ({ productId }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      // Appeler l'API pour ajouter au panier
      await axios.post('http://localhost:5000/cart/add', {
        userId: 'user_id_here', // Remplacez par l'identifiant de l'utilisateur
        productId,
        quantity
      });
      addToCart(productId, quantity);
      alert('Produit ajouté au panier avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <button onClick={handleAddToCart}>Ajouter au Panier</button>
    </div>
  );
};

export default AddToCart;

//ici le troisième fichier à mettre en place pour le panier 

import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Panier</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Produit ID: {item.productId}, Quantité: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;



//SAMA TESTE

import React, { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const cart = {
    items: cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import { accountService } from '../../_services/account.service';
import { useCart } from '../../pages/Public/Product/CartContext';
import './header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isLogged());
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState(''); // Ajout de l'état pour la recherche
    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { getCartCount } = useCart();

    const handleLogout = async () => {
        try {
            await accountService.logout();
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/home');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const submitSearch = () => {
        navigate(`/search?query=${searchText}`); // Redirige vers une page de résultats de recherche
        setMenuOpen(false); // Fermer le menu
    };

    return (
        <div>
            <header className='header'>
                <nav>
                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                    </div>
                    <ul className={menuOpen ? "menu-list open" : "menu-list"}>
                        <li>
                            <Link to='/home' onClick={() => setMenuOpen(false)}>PHONZ</Link>
                        </li>
                        <div className="search-bar">
                            <input
                                className='input-search'
                                type='text'
                                placeholder='Que cherchez-vous ?'
                                value={searchText}
                                onChange={handleSearch}
                            />
                            <button onClick={submitSearch} className="search-button">
                                <FaSearch className="search-icon" />
                            </button>
                        </div>
                        <li>
                            <Link to='/service' onClick={() => setMenuOpen(false)}>Service</Link>
                        </li>
                        <li>
                            <Link to='/contact' onClick={() => setMenuOpen(false)}>Contact</Link>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link to='/admin' onClick={() => setMenuOpen(false)}>Admin</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <Link to='/profile' onClick={() => setMenuOpen(false)}>Mon Profil</Link>
                            </li>
                        )}
                        <li>
                            <Link to='/shoppingcart' onClick={() => setMenuOpen(false)}>
                                <div className="cart-icon-container">
                                    <LiaShoppingBagSolid size={22} color="black" />
                                    {/* {getCartCount() > 0 && (
                                        <span className="cart-count">{getCartCount()}</span>
                                    )} */}
                                </div>
                            </Link>
                        </li>
                        <div className="user-icon">
                            {isLoggedIn ? (
                                <Link onClick={handleLogout}>Déconnexion</Link>
                            ) : (
                                <Link to='/login'> <IoPersonOutline size={22} color='green' /></Link>
                            )}
                        </div>
                    </ul>
                {/* MENU DEROULANT POUR TOUS LES CATEGORIES */}
                {/* <div className="category-menu">
                    <p
                        className="category-button"
                        onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                    >
                        Tous nos produits
                    </p>
                    {categoryMenuOpen && (
                        <div className="vertical-menu">
                            <ul>
                                {categories.map((category) => (
                                    <li className="menu-item" key={category._id}>
                                        <span>{category.name}</span>
                                        <ul className="submenu">
                                            {category.subcategories.map((subcategory) => (
                                                <li key={subcategory._id}>
                                                    <Link to={`/products/${subcategory._id}`}>
                                                        {subcategory.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div> */}
                </nav>
            </header>
        </div>
    );
};

export default Header;



import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
// import AssociatedAccessories from './AssociatedAccessories';
import './productDetails.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedImage, setHighlightedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData.product);
        if (productData.product.colors.length > 0) {
          setSelectedColor(productData.product.colors[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
        setError('Veuillez-vous connecter pour ajouter un produit dans le panier');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const imageForColor = product.images.find(image => image.color === color);
    if (imageForColor) {
      setHighlightedImage(imageForColor);
    }
  };

  const formatStorageCapacity = (capacity) => {
    if (capacity >= 1024) {
      const terabytes = (capacity / 1024).toFixed(1);
      return `${terabytes === '1.0' ? '1' : terabytes} TB`;
    } else {
      return `${capacity} Go`;
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-details-container'>
      <div className='product-additional-images'>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:4000/uploads/${image}`}
            alt={product.title}
            className={`product-additional-image ${highlightedImage === image ? 'highlighted' : ''}`}
            onClick={() => setHighlightedImage(image)}
          />
        ))}
      </div>
      {highlightedImage && (
        <div className='product-highlighted-image-container'>
          <img
            src={`http://localhost:4000/uploads/${highlightedImage}`}
            alt={product.title}
            className='product-highlighted-image'
            width={400}
            height={400}
          />
        </div>
      )}

      <div className='product-items'>
        <h3 className='product-title'>{product.title}</h3>
        <p className='product-description'>{product.description}</p>
        <p>Couleur : 
          {product.color}</p>
        <p>Autres couleurs disponibles:</p>
        {/* <div className="color-buttons">
          {product.colors.map((color, index) => (
            <div className='carre-bouton'>
            <button
              key={index}
              style={{ backgroundColor: color }}
              className={`color-button ${color === selectedColor ? 'selected' : ''}`}
              onClick={() => handleColorClick(color)}
            />
            </div>
          ))}
        </div> */}
        <p className='product-price'>{product.price} €</p>
        {/* <p>{product.type}</p> */}
        <p className="capacity-label">Capacité:</p>
        <div className='storagelist'>
          {product.storageCapacity.map((capacity, index) => (
            <div key={index} className='storageCapacity'>
              {formatStorageCapacity(capacity)}
            </div>
          ))}
        </div>
        <button className='buttonClass' onClick={handleAddToCart}>Réserver une table </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductDetails;
