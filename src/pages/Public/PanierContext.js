import React, { createContext, useState, useContext } from 'react';

const PanierContext = createContext();

export const usePanier = () => {
  return useContext(PanierContext);
};

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (produit) => {
    // Vérifier si le produit existe déjà dans le panier en utilisant une clé unique (combinant ID et autres propriétés)
    const existingProductItem = state.items.find(
        (item) => item.productId === newProduct.id
    );

    if (!existingProductItem) {
        state.items.push({
            productId: newProduct.id,
            title: title,
            description:description,
            price: price,
            image: image,
            quantity : 1,
        });
    } else {
        existingProductItem.quantity++;
    }

  const supprimerDuPanier = (idProduit) => {
    const newPanier = panier.filter((produit) => produit.id !== idProduit);
    setPanier(newPanier);
  };

  const modifierQuantiteDansPanier = (productId, newQuantity) => {
    const updatedPanier = panier.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setPanier(updatedPanier);
  };

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, modifierQuantiteDansPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

export default PanierProvider;
