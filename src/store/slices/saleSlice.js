import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/sale';

/** States */
const initialState = {
  isLoading: false,
  carts: [],
  sales: [],
  currentSales: [],
  actionResult: null,
  outlets: [],
  ongkir: null,
};

/** Slice */
const saleSlice = createSlice({
  name: 'sale',
  initialState,
  extraReducers: reducers,
});

export default saleSlice;
