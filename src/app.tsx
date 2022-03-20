import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Component Imports
import Error from './pages/error/error';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ProductList from './pages/product/product-list';
import ProductAdd from './pages/product/product-add';
import ProductDetails from './pages/product/product-details';
import ProductCatalogueList from './pages/product-catalogue/product-catalogue-list';
import ProductCatalogueAdd from './pages/product-catalogue/product-catalogue-add';
import ProductCatalogueDetails from './pages/product-catalogue/product-catalogue-details';
import Product from "./pages/product";
import ProductCatalogue from "./pages/product-catalogue";
import RequireAuthentication from "./components/protected-route";
import Administration from "./pages/administration";
//


function App() {
  return (
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="" element={
          <RequireAuthentication roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_PERSONNEL']}>
            <Home/>
          </RequireAuthentication>}
        />
        <Route path="product" element={
          <RequireAuthentication roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_PERSONNEL']}>
            <Product/>
          </RequireAuthentication>
        }>
          <Route path="" element={<ProductList/>} />
          <Route path=":id" element={<ProductDetails/>} />
          <Route path="add" element={<ProductAdd/>} />
        </Route>
        <Route 
          path="product-catalogue" element={
            <RequireAuthentication roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN']}>
              <ProductCatalogue/>
            </RequireAuthentication>
        }>
          <Route path="" element={<ProductCatalogueList/>}/>
          <Route path=":id" element={<ProductCatalogueDetails/>}/>
          <Route path="add" element={<ProductCatalogueAdd/>}/>
        </Route>
        <Route path="administration" element={<Administration/>}>
          <Route path="" element={<ProductCatalogueList/>}/>
          <Route path=":id" element={<ProductCatalogueDetails/>}/>
          <Route path="add" element={<ProductCatalogueAdd/>}/>
        </Route>
      </Routes>
  );
}

export default App;