import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // État pour la largeur de la fenêtre

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Mettre à jour la largeur de la fenêtre
      setIsSidebarVisible(window.innerWidth >= 700); // Mise à jour de la visibilité de la sidebar
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appeler une fois pour définir la valeur initiale

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Définir le style conditionnel pour popUpMenu en fonction de la largeur de la fenêtre
  const popUpMenuStyle = {
    position: 'absolute',
    top: windowWidth < 700 ? '76px' : '60px',
    right: windowWidth < 700 ? '10px' : '20px',
    backgroundColor: 'rgb(245, 244, 245)',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px',
    borderRadius: '13px',
    zIndex: 1000,
    width: windowWidth < 700 ? '200px' : 'auto', // Applique 200px si < 700px, sinon auto
  };

  // const cardsSectionStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: windowWidth < 530 ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', // Un seul élément par ligne si < 530px
  //   gap: '20px',
  //   marginBottom: '30px',
  // };

  return (
    <div style={styles.container}>
     
      {isSidebarVisible && (
        <aside style={styles.sidebar}>
          <h2 style={styles.gestionstock}>Gestion de Stock</h2>
          <ul style={styles.navList}>
            {['Stock', 'Commandes', 'Livraisons', 'Ventes'].map((menu) => (
             <li key={menu} style={styles.navItem}>
             <Link
               to={`/${menu.toLowerCase()}`}
               onClick={() => handleMenuClick(menu)}
               style={{
                 display: 'block', // Pour que le lien prenne toute la largeur du li
                 padding: '10px', // Ajout de padding pour le confort
                 textDecoration: 'none', // Supprimer le soulignement
                 color: '#fff', // Couleur du texte
                 backgroundColor: activeMenu === menu ? '#1abc9c' : '#34495e', // Application du style
                 borderRadius: '5px', // Coins arrondis
               }}
             >
               {menu}
             </Link>
              </li>
            ))}
          </ul>
        </aside>
      )
      }

      <div style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>Groupe Sankore</h1>
          {windowWidth < 700 && (
              <FaBars onClick={toggleMenu} style={styles.menuIcon} />
            )}
          
        </header>

        {isMenuOpen && (
    <div style={popUpMenuStyle}>
        <ul style={styles.navList}>
            {['Stock', 'Commandes', 'Livraisons', 'Ventes'].map((menu) => (
                <li key={menu} style={styles.navItem}>
                    <Link
                        to={`/${menu.toLowerCase()}`}
                        onClick={() => handleMenuClick(menu)} // Ferme le pop-up après le clic
                        style={{
                            display: 'block',
                            padding: '10px',
                            textDecoration: 'none',
                            color: '#fff',
                            backgroundColor: activeMenu === menu ? '#1abc9c' : '#34495e',
                            borderRadius: '5px',
                        }}
                    >
                        {menu}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)}  
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    boxSizing: 'border-box',
  },
  gestionstock: {
    color:'red',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    margin: '20px 0',
    cursor: 'pointer',
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: '#34495e',
    borderRadius: '8px',
    color: '#ecf0f1',
  },
  main: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    color: 'red',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  menuIcon: {
    cursor: 'pointer',
    fontSize: '24px',
    marginLeft: '10px',
  },
  
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: '50%',
    marginLeft: '10px',
  },
 
  
};

export default Dashboard;
