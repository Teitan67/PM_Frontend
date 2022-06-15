import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./components/App"

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path='*' element={<App/>}></Route>
  </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

