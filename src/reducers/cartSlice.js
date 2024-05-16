// import { createSlice } from '@reduxjs/toolkit';
// import { cartService } from '../_services/cart.service';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addToCartStart: state => {
//       state.loading = true;
//       state.error = null;
//     },
//     addToCartSuccess: (state, action) => {
//       state.loading = false;
//       state.cartItems.push(action.payload);
//       console.log('Payload reçu:', action.payload);
//     },
    
//     addToCartFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     removeFromCartStart: state => {
//       state.loading = true;
//       state.error = null;
//     },
//     removeFromCartSuccess: (state, action) => {
//       state.loading = false;
//       state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
//     },
//     removeFromCartFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateQuantityStart: state => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateQuantitySuccess: (state, action) => {
//       state.loading = false;
//       const { productId, quantity } = action.payload;
//       const itemToUpdate = state.cartItems.find(item => item.productId === productId);
//       if (itemToUpdate) {
//         itemToUpdate.quantity = quantity;
//       }
//     },
//     updateQuantityFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   addToCartStart,
//   addToCartSuccess,
//   addToCartFailure,
//   removeFromCartStart,
//   removeFromCartSuccess,
//   removeFromCartFailure,
//   updateQuantityStart,
//   updateQuantitySuccess,
//   updateQuantityFailure,
// } = cartSlice.actions;

// export const addToCart = (productId, quantity) => async (dispatch) => {
//   try {
//     dispatch(addToCartStart());
//     const response = await cartService.addToCart(productId, quantity);

//     if (response.error) {
//       console.error(`Erreur lors de l'ajout du produit au panier:`, response.error);
//       dispatch(addToCartFailure(response.error));
//     } else {
//       const newItem = response.data;
//       dispatch(addToCartSuccess(newItem));
//     }
//   } catch (error) {
//     dispatch(addToCartFailure(error.message));
//   }
// };


// export const removeFromCart = productId => async dispatch => {
//   try {
//     dispatch(removeFromCartStart());
//     await cartService.removeFromCart(productId);
//     dispatch(removeFromCartSuccess(productId));
//   } catch (error) {
//     dispatch(removeFromCartFailure(error.message));
//   }
// };

// export const updateQuantity = (productId, quantity) => async dispatch => {
//   try {
//     dispatch(updateQuantityStart());
//     await cartService.updateProductQuantity(productId, quantity);
//     dispatch(updateQuantitySuccess({ productId, quantity }));
//   } catch (error) {
//     dispatch(updateQuantityFailure(error.message));
//   }
// };

// export default cartSlice.reducer;

