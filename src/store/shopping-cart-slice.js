// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const shoppingCartSlice = createSlice({
//     name: 'shopping-cart',
//     initialState:{
//        items: [],
//        isCartVisible: false
//     },
//     reducers: {
//         toggleCartView(state){
//             state.isCartVisible = !state.isCartVisible;
//         },
//         addItemToCart(state, action){
//             const newProduct = action.payload;
//             console.log(newProduct);

//             const existingProductItem = state.items.find(
//                 (item) => item.productId === newProduct.id
//             );

//             if (!existingProductItem) {
//                 state.items.push({
//                     productId: newProduct.id,
//                     title: newProduct.title,
//                     description: newProduct.description,
//                     price: newProduct.price,
//                     image: newProduct.image,
//                     quantity : 1,
//                 });
//             } else {
//                 existingProductItem.quantity++;
//             }
//         }
//     }
// });

// export const shoppingCartActions = shoppingCartSlice.actions;

// export default shoppingCartSlice;
