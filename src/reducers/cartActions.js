export const addToCart = (productId, quantity) => ({
    type: 'ADD_TO_CART_REQUEST',
    payload: { productId, quantity }
  });
  
  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART_REQUEST',
    payload: productId
  });
  
  export const updateQuantity = (productId, newQuantity) => ({
    type: 'UPDATE_QUANTITY_REQUEST',
    payload: { productId, newQuantity }
  });
  