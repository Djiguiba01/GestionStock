import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FaBars } from 'react-icons/fa'; 
import logo from '../images/logo22.png'; // Importez votre logo ici
import './Menu.css'; 

const Menu = ({ children }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);
  const location = useLocation(); // Utilisez useLocation pour obtenir l'URL actuelle
  const [selectedMenu, setSelectedMenu] = useState(location.pathname); // Initialise avec l'URL actuelle

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 700) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    // Mettre à jour selectedMenu lorsque l'URL change
    setSelectedMenu(location.pathname);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]); // Ajoutez location.pathname comme dépendance

  return (
    <div className="menu-container">
      <header className="menu-header">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1>Groupe Sankore</h1>
        <FaBars className="menu-icon" onClick={togglePopup} />
      </header>
      <div className="menu-content">
        <aside className="menu-aside">
          <ul>
            <li>
              <Link 
                to="/stock" 
                className={`card ${selectedMenu === '/stock' ? 'selected-card' : ''}`} 
                onClick={() => setSelectedMenu('/stock')}
              >
                Stock
              </Link>
            </li>
            <li>
              <Link 
                to="/commandes" 
                className={`card ${selectedMenu === '/commandes' ? 'selected-card' : ''}`} 
                onClick={() => setSelectedMenu('/commandes')}
              >
                Commandes
              </Link>
            </li>
            <li>
              <Link 
                to="/livraisons" 
                className={`card ${selectedMenu === '/livraisons' ? 'selected-card' : ''}`} 
                onClick={() => setSelectedMenu('/livraisons')}
              >
                Livraisons
              </Link>
            </li>
            <li>
              <Link 
                to="/ventes" 
                className={`card ${selectedMenu === '/ventes' ? 'selected-card' : ''}`} 
                onClick={() => setSelectedMenu('/ventes')}
              >
                Ventes
              </Link>
            </li>
          </ul>
        </aside>
        <main className="menu-main">
          {children}
        </main>
      </div>

      {isPopupVisible && (
  <div className="popup-menu" ref={popupRef}>
    <ul>
      <li>
        <Link to="/stock" className={`card ${selectedMenu === '/stock' ? 'selected-card' : ''}`} onClick={() => setSelectedMenu('/stock')}>Stock</Link>
      </li>
      <li>
        <Link to="/commandes" className={`card ${selectedMenu === '/commandes' ? 'selected-card' : ''}`} onClick={() => setSelectedMenu('/commandes')}>Commandes</Link>
      </li>
      <li>
        <Link to="/livraisons" className={`card ${selectedMenu === '/livraisons' ? 'selected-card' : ''}`} onClick={() => setSelectedMenu('/livraisons')}>Livraisons</Link>
      </li>
      <li>
        <Link to="/ventes" className={`card ${selectedMenu === '/ventes' ? 'selected-card' : ''}`} onClick={() => setSelectedMenu('/ventes')}>Ventes</Link>
      </li>
    </ul>
  </div>
)}


    </div>
  );
};

export default Menu;
