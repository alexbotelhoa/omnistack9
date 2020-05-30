import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Header from './components/Header'
import Routes from './routes'

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}
