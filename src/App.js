import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './pages/Public/PublicRouter';
import AdminRouter from './pages/Admin/AdminRouter';
import AuthRouter from './pages/Auth/AuthRouter';
import AuthGuard from './_helpers/AuthGuard';
import { Suspense } from 'react';
import { CartProvider } from '../src/pages/Public/Product/CartContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}> 
         <CartProvider>
            <Routes>
              <Route path="/*" element={<PublicRouter />} />
              <Route
                path="/admin/*"
                element={
                  <AuthGuard>
                    <AdminRouter />
                  </AuthGuard>
                }
              />
              <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
            </CartProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
