import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import { accountService } from '../../_services/account.service';
import { useCart } from '../../pages/Public/Product/CartContext';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                            <Link to='/home' onClick={() => setMenuOpen(false)}>CALLWAYZ</Link>
                        </li>
                        <div className="search-bar">
                            <input
                                className='input-search'
                                type='text'
                                placeholder='Restaurant autour de moi ?'
                                value={searchText}
                                onChange={handleSearch}
                            />
                        
                                <FaSearch className="search-icon" />
                           
                        </div>
                        <li>
            <Link to='/service' onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faTruck} /> {/* Utilisation de l'icône de camion */}
            </Link>
        </li>
                        {/* <li>
                            <Link to='/contact' onClick={() => setMenuOpen(false)}>Contact</Link>
                        </li> */}
                        {/* {isLoggedIn && (
                            <li>
                                <Link to='/admin' onClick={() => setMenuOpen(false)}>Admin</Link>
                            </li>
                        )} */}
                        {isLoggedIn && (
                            <li>
                                <Link to='/profile' onClick={() => setMenuOpen(false)}>Mon Profil</Link>
                            </li>
                        )}
                        {/* <li>
                            <Link to='/shoppingcart' onClick={() => setMenuOpen(false)}>
                                <div className="cart-icon-container">
                                    <LiaShoppingBagSolid size={22} color="black" />
                                    {getCartCount() > 0 && (
                                        <span className="cart-count">{getCartCount()}</span>
                                    )}
                                </div>
                            </Link>
                        </li> */}
                        <div className="user-icon">
                            {isLoggedIn ? (
                                <Link onClick={handleLogout}>Déconnexion</Link>
                            ) : (
                                <Link to='/login'> <IoPersonOutline size={22} color='green' /></Link>
                            )}
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
