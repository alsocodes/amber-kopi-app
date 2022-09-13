import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/sale';

/** States */
const initialState = {
  isLoading: false,
  carts: [],
  sales: [],
  salesFetching: false,
  activeSales: [],
  activesalesFetching: false,
  actionResult: null,
  outlets: [],
  ongkir: null,
  creatingSale: false,
  sale: null,
  saleFetching: false,
  bankaccounts: [],
  cartProducts: [],
  business: null,
  tracking: null,
  trackingFecthing: false,
  resellerSales: null,
  resellerSalesFetching: false,
};

/** Slice */
const saleSlice = createSlice({
  name: 'sale',
  initialState,
  extraReducers: reducers,
});

export default saleSlice;
