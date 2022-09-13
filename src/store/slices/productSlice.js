import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/product';

/** States */
const initialState = {
  product: {
    isLoading: false,
    products: [],
    catProducts: [],
    banners: [],
    bannerFetching: false,
    searches: [],
    searchFetching: false,
    relatedProducts: [],
    productsByCat: [],
  },
};

/** Slice */
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: reducers,
});

export default productSlice;
