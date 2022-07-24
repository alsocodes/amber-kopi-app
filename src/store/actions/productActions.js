import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';
import axios from 'axios';

export const setProductLoading = createAction('SET_PRODUCT_LOADING');

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (category, {dispatch, getState}) => {
    console.log('fetch products');
    try {
      const {result} = await api.get('/products');
      // console.log('result products', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchAllCatProducts = createAsyncThunk(
  'product/fetchAllCatProducts',
  async (_, {dispatch, getState}) => {
    console.log('fetch categories');
    try {
      const {result} = await api.get('/products/category');
      // const result = axios.get('https://eipiai.smpn33-sby.sch.id/');
      // console.log('result category', result);
      return result;
    } catch (err) {
      console.log(err.message);
    }

    return [];
  },
);
