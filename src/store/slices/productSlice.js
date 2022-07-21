import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/product';

/** States */
const initialState = {
  product: {
    isLoading: false,
    products: [],
    catProducts: [],
  },
};

/** Slice */
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: reducers,
});

export default productSlice;
