import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App"

ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

