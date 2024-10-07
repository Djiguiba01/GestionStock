import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Product from './ProductModel';
import './Stock.css';

const Stock = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [designation, setDesignation] = useState('');
  const [variete, setVariete] = useState('');
  const [quantite, setQuantite] = useState('');
  const [unite, setUnite] = useState('');
  const [productList, setProductList] = useState([]);
  const [errors, setErrors] = useState({}); // Pour gérer les messages d'erreur

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
    setSelectedProductIndex(null); 
    setDesignation('');
    setVariete('');
    setQuantite('');
    setUnite('');
    setErrors({}); // Réinitialiser les erreurs lors de l'ouverture du popup
  };

  const handleEditProductClick = (index) => {
    const product = productList[index];
    setDesignation(product.designation);
    setVariete(product.variete);
    setQuantite(product.quantite);
    setUnite(product.unite);
    setSelectedProductIndex(index);
    setIsPopupOpen(true);
    setErrors({}); // Réinitialiser les erreurs lors de l'ouverture du popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setErrors({}); // Réinitialiser les erreurs lors de la fermeture du popup
  };

  const handleSubmit = () => {
    // Validation des champs
    const newErrors = {};
    if (!designation) newErrors.designation = 'La désignation est requise.';
    if (!variete) newErrors.variete = 'La variété est requise.';
    if (!quantite) newErrors.quantite = 'La quantité est requise.';
    if (!unite) newErrors.unite = 'L’unité est requise.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Ne pas soumettre si des erreurs existent
    }

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
    if (selectedProductIndex !== null) {
      const updatedProducts = productList.filter((_, index) => index !== selectedProductIndex);
      setProductList(updatedProducts);
      handleClosePopup();
    }
  };

  return (
    <Menu>
      <div className="stock-card">
        <h2>Stock disponible</h2>
        <button className="add-product-button" onClick={handleAddProductClick}>
          Ajouter un produit
        </button>
      </div>

      <div className="product-list">
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

      {/* Popup */}
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
              />
              {errors.designation && <span className="error-message">{errors.designation}</span>}
            </label>
            <label>
              Variété:
              <input
                type="text"
                value={variete}
                onChange={(e) => setVariete(e.target.value)}
              />
              {errors.variete && <span className="error-message">{errors.variete}</span>}
            </label>
            <label>
              Quantité:
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
              />
              {errors.quantite && <span className="error-message">{errors.quantite}</span>}
            </label>
            <label>
              Unité:
              <select value={unite} onChange={(e) => setUnite(e.target.value)}>
                <option value="">Sélectionnez une unité</option>
                <option value="gr">Gr</option>
                <option value="kg">Kg</option>
                <option value="boite(s)">Boite(s)</option>
                <option value="pièces">Pièces</option>
              </select>
              {errors.unite && <span className="error-message">{errors.unite}</span>}
            </label>
            <div className="popup-buttons">
              <button onClick={handleSubmit}>{selectedProductIndex !== null ? 'Modifier' : 'Ajouter'}</button>
              {selectedProductIndex !== null && (
                <button onClick={handleDeleteProduct}>Supprimer</button>
              )}
            </div>
          </div>
        </div>
      )}
    </Menu>
  );
};

export default Stock;
