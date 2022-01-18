import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import "./App.scss";
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { UserSessionContextProvider } from './components/UserSessionContext';

import 'bootstrap';


ReactDOM.render(
  <BrowserRouter>
    <UserSessionContextProvider>
      <App />
    </UserSessionContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);