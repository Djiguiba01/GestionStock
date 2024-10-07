import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Stock from './Entete/Stock/Stock';
import Commandes from './Commandes/Commandes';
import Livraisons from './Livraisons/Livraisons';
import Ventes from './Ventes/Ventes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} /> {/* Route pour la page du menu principal */}
        <Route path="/stock" element={<Stock />} />
        <Route path="/commandes" element={<Commandes />} />
        <Route path="/livraisons" element={<Livraisons />} />
        <Route path="/ventes" element={<Ventes />} />
      </Routes>
    </Router>
  );
};

export default App;
