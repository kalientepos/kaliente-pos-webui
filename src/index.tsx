import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
//
import store from './store';
// Styling imports
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";   //theme
import "primereact/resources/primereact.min.css";                         //core css
import "primeicons/primeicons.css";                                       //icons
import './index.css';
//

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error/>}/>
          <Route path="" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="product" element={<ProductList/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
          <Route path="product/add" element={<ProductAdd/>} />
          <Route path="product-catalogue" element={<ProductCatalogueList/>}/>
          <Route path="product-catalogue/:id" element={<ProductCatalogueDetails/>}/>
          <Route path="product-catalogue/add" element={<ProductCatalogueAdd/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
