import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/auth';

/** States */
const initialState = {
  product: {
    isLoading: false,
    products: [],
    catProducts: [],
  },
};

/** Slice */
const authSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: reducers,
});

export default authSlice;
