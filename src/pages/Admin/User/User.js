import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import { useCart } from '../../../pages/Public/Product/CartContext';
import { accountService } from '../../../_services/account.service';
// import './header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isLogged());
    const [searchText, setSearchText] = useState(''); // Texte de recherche
    const navigate = useNavigate();
    const { getCartCount } = useCart();

    const handleSearchChange = (e) => {
        setSearchText(e.target.value); // Mettre à jour le texte de recherche
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut
        if (searchText.trim()) {
            navigate(`/search?query=${searchText.trim()}`); // Redirection vers la page de recherche
            setSearchText(''); // Réinitialiser le texte de recherche après la soumission
        }
    };

    return (
        <header className='header'>
            <nav>
                <ul className="menu-list">
                    <li>
                        <Link to='/home'>PHONZ</Link>
                    </li>
                    <li>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                className="input-search"
                                placeholder="Que cherchez-vous ?"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="search-button">
                                <FaSearch />
                            </button>
                        </form>
                    </li>
                    <li>
                        <Link to='/service'>Service</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to='/admin'>Admin</Link>
                            </li>
                            <li>
                                <Link to='/profile'>Mon Profil</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to='/shoppingcart'>
                            <LiaShoppingBagSolid size="22" color="black" />
                            {getCartCount() > 0 && (
                                <span className="cart-count">{getCartCount()}</span>
                            )}
                        </Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button onClick={() => accountService.logout()}>Déconnexion</button>
                        ) : (
                            <Link to='/login'> <IoPersonOutline size={22} color='green' /></Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
