import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  return (
   <>
    <Router>
      <Nav />
      <AppRouter />
      <Footer />
    </Router>
    </>
  );
};

export default App;
