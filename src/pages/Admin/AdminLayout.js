import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../component/admin/AdminHeader';
import SideMenu from '../../component/admin/SideMenu';
// import './adminLayout.css'; 

const AdminLayout = () => {
    return (
        <div className='adminGrid'>
            <AdminHeader />
            <div className='adminSideMenu'>
                <SideMenu />
            </div>
            <div className='adminContent'>
                <Outlet />
            </div>
            
        </div>
    );
};

export default AdminLayout;
