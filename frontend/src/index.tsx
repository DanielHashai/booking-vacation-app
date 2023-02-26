import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/LayoutArea/Header/Header';
import Layout from './Components/LayoutArea/Layout/Layout';
import HeaderAdmin from './Components/VacationAreaAdmin/HeaderAdmin/HeaderAdmin';
import './index.css';
import { authStore } from './Redux/AuthState';

import reportWebVitals from './reportWebVitals';
import interceptors from './Utils/Interceptors';
interceptors.create();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <BrowserRouter>
       <Layout/>
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
