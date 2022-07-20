import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';

export const setProductLoading = createAction('SET_PRODUCT_LOADING');

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (category, {dispatch, getState}) => {
    dispatch(setProductLoading(true));
    setTimeout(() => {
      dispatch(setProductLoading(false));
    }, 10);

    try {
      const {result} = await api.get('/products');
      console.log('result products', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchAllCatProducts = createAsyncThunk(
  'product/fetchAllCatProducts',
  async (category, {dispatch, getState}) => {
    dispatch(setProductLoading(true));
    setTimeout(() => {
      dispatch(setProductLoading(false));
    }, 10);

    try {
      const {result} = await api.get('/products/category');
      console.log('result category', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);
