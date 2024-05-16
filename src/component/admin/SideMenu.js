// SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sideMenu.css'
const SideMenu = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Mon site</Link></li>
        <li><Link to="/admin/dashboard">Tableau de bord</Link></li>
        <nav className="admin-nav">
            <ul>
                <li><Link to='/'>Mon site</Link></li>
                <li className="nav-dropdown">
                <span>Utilisateurs</span>
                                    <ul>
                                        <li><Link to="/admin/user/index">Liste</Link></li>
                                     
                                        <li><Link to='/admin/user/adduserrole'>User +</Link></li>
                                        <li><Link to='/admin/user/permission'>Permission +</Link></li>
                                        <li><Link to='/admin/user/adminform'>form role +</Link></li>
                                    </ul>
                </li>
                                 <li className="nav-dropdown">
                                  <span>Produits</span>
                                    <ul>
                                        <li><Link to="/admin/product/index">Liste</Link></li>
                                        <li><Link to='/admin/product/add'>Ajouter un produit</Link></li>
                                        <li><Link to='/admin/product/addaccessoryform'>Ajouter un accessoire</Link></li>
                                        <li><Link to='/admin/product/edit/:id'>Modifier</Link></li>
                                        <li><Link to='/admin/product/delete/:id'>Supprimer</Link></li>
                                    </ul>
                                  </li>


                                  <li className="nav-dropdown">
                                  <span>Carousels</span>
                                    <ul>
                                        <li><Link to="/admin/carousel/index">Liste de Carousel</Link></li>
                                        <li><Link to="/admin/carousels/add">Ajouter un Carousel</Link></li>
                                        <li><Link to="/admin/carousels/edit/:id">Modifier le carousel</Link></li>
                                        <li><Link to="/admin/carousels/delete/:id">Supprimer le carousel</Link></li>
                                    </ul>
                                  </li>

                                  
                                  <li className="nav-dropdown">
                                  <span>Mes catégories</span>
                                    <ul>
                                        <li><Link to="/admin/category/index">Liste de Catégories</Link></li>
                                        <li><Link to="/admin/category/add">Ajouter un Catégories</Link></li>
                                        <li><Link to="/admin/category/edit/:id">Modifier un catégorie</Link></li>
                                        <li><Link to="/admin/category/delete/:id">Supprimer un catégorie</Link></li>
                                    </ul>
                                  </li>



                                  <li className="nav-dropdown">
                                  <span>Cammandes</span>
                                    <ul>
                                        <li><Link to="/admin/product/index">Liste</Link></li>
                                    </ul>
                                  </li>
            </ul>
        </nav>
      </ul>
    </div>
  );
};

export default SideMenu;
