import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Component Imports
import Error from './pages/error/error';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import ProductList from './pages/product/product-list';
import ProductAdd from './pages/product/product-add';
import ProductDetails from './pages/product/product-details';
import ProductCatalogueList from './pages/product-catalogue/product-catalogue-list';
import ProductCatalogueAdd from './pages/product-catalogue/product-catalogue-add';
import ProductCatalogueDetails from './pages/product-catalogue/product-catalogue-details';
import Product from "./pages/product";
import ProductCatalogue from "./pages/product-catalogue";
import RequireAuthorization from "./components/require-authorization";
import Administration from "./pages/administration/_index";
import PersonnelList from "./pages/administration/personnel-list";
import PersonnelAdd from "./pages/administration/personnel-add";
import AdminAdd from "./pages/administration/admin-add";
import AdminList from "./pages/administration/admin-list";
import AppPage from "./components/page/page";
//


function App() {
  return (
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route path="login" element={<Login/>} />
        <Route element={<AppPage/>}>
        <Route path="" element={<RequireAuthorization roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_PERSONNEL']}><Home /></RequireAuthorization>} />
          <Route path="product" element={
            <RequireAuthorization roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_PERSONNEL']}>
              <Product/>
            </RequireAuthorization>
          }>
            <Route path="" element={<ProductList/>} />
            <Route path=":id" element={<ProductDetails/>} />
            <Route path="add" element={<ProductAdd/>} />
            <Route path="update/:productId" element={<ProductAdd/>} />
          </Route>
          <Route 
            path="product-catalogue" element={
              <RequireAuthorization roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_PERSONNEL']}>
                <ProductCatalogue/>
              </RequireAuthorization>
          }>
            <Route path="" element={<ProductCatalogueList/>}/>
            <Route path=":id" element={<ProductCatalogueDetails/>}/>
            <Route path="add" element={<ProductCatalogueAdd/>}/>
            <Route path="update/:catalogueId" element={<ProductCatalogueAdd/>} />
          </Route>
          <Route path="administration" element={
            <RequireAuthorization roles={['ROLE_SUPERADMIN', 'ROLE_ADMIN']}>
              <Administration/>
            </RequireAuthorization>
          }>
          <Route path="" element={<PersonnelList/>}/>
            <Route path="add" element={<PersonnelAdd/>}/>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;