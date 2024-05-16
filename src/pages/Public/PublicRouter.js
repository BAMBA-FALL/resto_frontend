import React from 'react';
import { Routes, Route } from "react-router-dom"
import { Layout, Home, Service, Contact } from '../Public'
import Error from '../../_Utiles/Error'
import { ProductList, ProductByCategory, ProductDetails, CategoriesList, ShoppingCart } from '../Public/Product'
import Profile from '../Public/User/Profile';
import ProfileUpdate from './User/ProfileUpdate';
import Login from '../Auth/Login';
import SignInForm from '../Auth/SignInForm';
const PublicRouter = () => {

    return (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="service" element={<Service />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
            <Route path="login" element={<Login />} />
            <Route path="signinform" element={<SignInForm />} />
            <Route path="productlist" element={<ProductList/>}/>
            <Route path="/products/:productId" element={<ProductDetails />} />
            {/* <Route path="/productbycategory/:categoryId" element={<ProductByCategory />} />
            <Route path="/categorieslist" element={<CategoriesList />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="/profile/update" element={ProfileUpdate} />
           
          </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default PublicRouter;