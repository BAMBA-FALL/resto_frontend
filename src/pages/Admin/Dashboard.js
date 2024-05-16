import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../_services/product.service';
import SideMenu from '../../component/admin/SideMenu'; // Importer SideMenu
import AdminHeader from '../../component/admin/AdminHeader'
import './dashboard.css';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const count = await productService.getProductCount();
        setProductCount(count);
      } catch (error) {
        setError('Erreur lors de la récupération du nombre de produits');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductCount();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="content">
        {/* <div className="main-content">
          <h2>Dashboard</h2>
          <input type="text" placeholder="Recherche" />
          <img src={require('../../images/image1.jpg')} alt="Profile" className="profile-image" />
        </div> */}
       <div className="main-content">
          <Link to="/admin/user/index" className="card">
           <div className="card-content">
            <h3>Nombre total d'utilisateurs</h3>
            <p>{productCount}</p>
            </div>
         </Link>

         <Link to="/admin/user/index" className="card">
          <div className="card-content">
          <h3>Nombre total d'utilisateurs</h3>
           <p>{userCount}</p>
            </div>
          </Link>
         <Link to="/admin/user/index" className="card">
           <div className="card-content">
            <h3>Nombre total d'utilisateurs</h3>
            <p>{userCount}</p>
           </div>
         </Link>

          <Link to="/admin/user/index" className="card">
           <div className="card-content">
             <h3>Nombre total d'utilisateurs</h3>
             <p>{userCount}</p>
           </div>
           </Link>

       </div>
    </div>
  </div>
  );
};

export default Dashboard;
