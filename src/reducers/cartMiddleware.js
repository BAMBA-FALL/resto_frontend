import axios from 'axios';
import { addToCartSuccess, addToCartFailure } from '../actions/cartActions';

export const addToCartRequest = (productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post('/api/cart/add', { productId, quantity });
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFailure(error.message));
  }
};
