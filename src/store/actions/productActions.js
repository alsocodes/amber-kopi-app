import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';
import axios from 'axios';

export const setProductLoading = createAction('SET_PRODUCT_LOADING');

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (params, {dispatch, getState}) => {
    console.log('fetch products');
    try {
      const {result} = await api.get('/products', {params: params});
      console.log('result products', params);
      return result;
    } catch (err) {
      console.log(err);
      return getState().product?.product?.products;
    }
  },
);

export const fetchAllProductsByCat = createAsyncThunk(
  'product/fetchAllProductsByCat',
  async (params, {dispatch, getState}) => {
    console.log('fetch products');
    try {
      const {result} = await api.get('/products', {params: params});
      console.log('result products', params);
      return result;
    } catch (err) {
      console.log(err);
      return getState().product?.product?.products;
    }
  },
);

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (params, {dispatch, getState}) => {
    console.log('search products', params);
    try {
      const {result} = await api.get('/products', {params: params});
      // console.log('result products', result);
      return result;
    } catch (err) {
      console.log(err);
      return [];
      // return getState().product?.product?.products;
    }
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
      return getState().product?.product?.catProducts;
    }
  },
);

export const fetchAllBanners = createAsyncThunk(
  'product/fetchAllBanners',
  async (_, {dispatch, getState}) => {
    console.log('fetch banners');
    try {
      const {result} = await api.get('/banners');
      return result;
    } catch (err) {
      console.log('xx disini', err.message);
      return getState().product?.product?.banners;
    }
  },
);

export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelatedProducts',
  async (variantId, {dispatch, getState}) => {
    console.log('fetch products');
    try {
      const {result} = await api.get(`/products/${variantId}/related`);
      console.log('result related products', result);
      return result;
    } catch (err) {
      console.log(err);
      return getState().product?.product?.relatedProducts;
    }
  },
);
