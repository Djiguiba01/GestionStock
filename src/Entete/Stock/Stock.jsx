import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Product from './ProductModel';
import './Stock.css';

const Stock = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [designation, setDesignation] = useState('');
  const [variete, setVariete] = useState('');
  const [quantite, setQuantite] = useState('');
  const [unite, setUnite] = useState('');
  const [productList, setProductList] = useState([]);

  // Load saved products from localStorage when the component is mounted
  useEffect(() => {
    const savedProducts = localStorage.getItem('productList');
    if (savedProducts) {
      setProductList(JSON.parse(savedProducts));
    }
  }, []);

  // Save the updated product list to localStorage whenever productList changes
  useEffect(() => {
    localStorage.setItem('productList', JSON.stringify(productList));
  }, [productList]);

  const handleAddProductClick = () => {
    setIsPopupOpen(true);
    setSelectedProductIndex(null); // Réinitialiser l'index pour l'ajout d'un nouveau produit
  };

  const handleEditProductClick = (index) => {
    const product = productList[index];
    setDesignation(product.designation);
    setVariete(product.variete);
    setQuantite(product.quantite);
    setUnite(product.unite);
    setSelectedProductIndex(index); // Définir l'index du produit sélectionné pour la modification
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setDesignation('');
    setVariete('');
    setQuantite('');
    setUnite('');
    setIsConfirmDeleteOpen(false);
  };

  const handleSubmit = () => {
    const newProduct = new Product(designation, variete, quantite, unite);

    if (selectedProductIndex !== null) {
      // Modifier le produit existant
      const updatedProducts = [...productList];
      updatedProducts[selectedProductIndex] = newProduct;
      setProductList(updatedProducts);
    } else {
      // Ajouter un nouveau produit
      setProductList([...productList, newProduct]);
    }

    handleClosePopup();
  };

  const handleDeleteProduct = () => {
    setIsConfirmDeleteOpen(true); // Ouvrir le popup de confirmation
  };

  const confirmDelete = () => {
    if (selectedProductIndex !== null) {
      const updatedProducts = productList.filter((_, index) => index !== selectedProductIndex);
      setProductList(updatedProducts);
      handleClosePopup();
    }
    setIsConfirmDeleteOpen(false); // Fermer le popup de confirmation
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false); // Fermer le popup de confirmation
  };

  return (
    <Menu>
      <div className="stock-card">
        <h2>Stock disponible</h2>
        <button className="add-product-button" onClick={handleAddProductClick}>
          Ajouter un produit
        </button>
      </div>

      {/* Display the list of products */}
      <div className="product-list">
        {/* Header for the product list */}
        <div className="product-header">
          <div>Désignation</div>
          <div>Variété</div>
          <div>Quantité</div>
          <div>Unité</div>
        </div>

        {productList.length > 0 ? (
          <ul>
            {productList.map((product, index) => (
              <li key={index} onClick={() => handleEditProductClick(index)}>
                <span>{product.designation}</span>
                <span>{product.variete}</span>
                <span>{product.quantite}</span>
                <span>{product.unite}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun produit ajouté.</p>
        )}
      </div>

      {/* Popup for adding/editing products */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedProductIndex !== null ? 'Modifier un produit' : 'Ajouter un produit'}</h3>
            <label>
              Désignation:
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </label>
            <label>
              Variété:
              <input
                type="text"
                value={variete}
                onChange={(e) => setVariete(e.target.value)}
                required
              />
            </label>
            <label>
              Quantité:
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                required
              />
            </label>
            <label>
              Unité:
              <select value={unite} onChange={(e) => setUnite(e.target.value)} required>
                <option value="">Sélectionnez une unité</option>
                <option value="gr">Gr</option>
                <option value="kg">Kg</option>
                <option value="boite(s)">Boite(s)</option>
                <option value="pièces">Pièces</option>
              </select>
            </label>
            <div className="popup-buttons">
              <button onClick={handleSubmit}>{selectedProductIndex !== null ? 'Modifier' : 'Ajouter'}</button>
              {/* Afficher le bouton Annuler uniquement lors de l'ajout */}
              {selectedProductIndex === null && (
                <button onClick={handleClosePopup}>Annuler</button>
              )}
              {selectedProductIndex !== null && (
                <button onClick={handleDeleteProduct}>Supprimer</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Popup for confirmation of deletion */}
      {isConfirmDeleteOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="popup-buttons">
              <button onClick={confirmDelete}>Confirmer</button>
              <button onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </Menu>
  );
};

export default Stock;
