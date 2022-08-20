import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';
import axios from 'axios';
import {Toast} from 'native-base';

export const resetActionResult = createAction('RESET_ACTION_RESULT');
export const resetSale = createAction('RESET_SALE');
export const createCart = createAction('CREATE_CART');
export const deleteCart = createAction('DELETE_CART');
export const updateCart = createAction('UPDATE_CART');

// export const createCart = createAsyncThunk(
//   'sale/createCart',
//   async (data, {dispatch, getState}) => {
//     try {
//       const result = await api.post('/carts', data);
//       // console.log('xx', result);
//       return result;
//     } catch (err) {
//       console.log(err);
//     }

//     return false;
//   },
// );

export const fetchCartProducts = createAsyncThunk(
  'sale/fetchCartProducts',
  async (data, {dispatch, getState}) => {
    try {
      const {result} = await api.get('/products', {params: data});
      // console.log('herexyyr', result?.rows);
      return result?.rows;
    } catch (err) {
      console.log(err);
      return getState().sale?.cartProducts;
    }

    // return [];
  },
);

// export const deleteCarts = createAsyncThunk(
//   'sale/deleteCarts',
//   async (id, {dispatch, getState}) => {
//     try {
//       console.log('herex');
//       const {result} = await api.delete(`/carts/${id}`);
//       return result;
//     } catch (err) {
//       console.log(err);
//     }

//     return [];
//   },
// );

// export const updateCarts = createAsyncThunk(
//   'sale/updateCarts',
//   async (data, {dispatch, getState}) => {
//     try {
//       console.log('herex');
//       const {result} = await api.put(`/carts/${data.id}`, data);
//       return result;
//     } catch (err) {
//       console.log(err);
//     }

//     return [];
//   },
// );

export const fetchOutlets = createAsyncThunk(
  'sale/fetchOutlets',
  async (_, {dispatch, getState}) => {
    try {
      console.log('herexyyr');
      const {result} = await api.get('/outlets');
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchBusiness = createAsyncThunk(
  'sale/fetchBusiness',
  async (id, {dispatch, getState}) => {
    try {
      console.log('herexyyr');
      const {result} = await api.get(`/business/${id}`);
      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
);

export const fetchOngkir = createAsyncThunk(
  'sale/fetchOngkir',
  async (data, {dispatch, getState}) => {
    try {
      console.log(
        'fetch ongkir',
        `/shipping/cost?originId=${data.originId}&destinationId=${
          data.destinationId
        }&weight=${data.weight}&tt=${new Date().getTime()}`,
      );
      const {result} = await api.get(
        `/shipping/cost?originId=${data.originId}&destinationId=${
          data.destinationId
        }&weight=${data.weight}&tt=${new Date().getTime()}`,
      );
      console.log('ongkir ', result);
      return result?.rajaongkir;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const createSales = createAsyncThunk(
  'sale/createSales',
  async (data, {dispatch, getState}) => {
    try {
      console.log('cretae sale');
      const {result} = await api.post(`/customer/sales`, data);
      console.log('cretae sale', result);
      return result;
    } catch (err) {
      Toast.show({title: err.message, bgColor: 'red.600'});
      console.log(err);
    }

    return null;
  },
);

export const fetchSales = createAsyncThunk(
  'sale/fetchSales',
  async (_, {dispatch, getState}) => {
    try {
      console.log('fetching sales');
      const {result} = await api.get('/customer/sales');
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchActiveSales = createAsyncThunk(
  'sale/fetchActiveSales',
  async (_, {dispatch, getState}) => {
    try {
      console.log('fetching active sales');
      const {result} = await api.get('/customer/sales', {
        params: {active: true.valueOf, pageSize: 100},
      });
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchSale = createAsyncThunk(
  'sale/fetchSale',
  async (id, {dispatch, getState}) => {
    try {
      console.log('fetching one sales');
      const {result} = await api.get(`/customer/sales/${id}`);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchBankaccounts = createAsyncThunk(
  'sale/fetchBankaccounts',
  async (_, {dispatch, getState}) => {
    try {
      console.log('fetching bankaccounts');
      const {result} = await api.get(`/bankaccounts`);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const createConfirmPayment = createAsyncThunk(
  'sale/createConfirmPayment',
  async (data, {dispatch, getState}) => {
    try {
      console.log('confirm payment');
      const {result} = await api.post(
        `/customer/sales/${data.id}/confirm`,
        data,
      );
      console.log('confirm payment', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchTracking = createAsyncThunk(
  'sale/fetchTracking',
  async (data, {dispatch, getState}) => {
    try {
      console.log('fetch tracking', data);
      const {result} = await api.get(
        `/shipping/waybill?courier=${data.courir}&waybill=${data.waybill}`,
      );
      console.log('fetch tracking', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const fetchResellerSale = createAsyncThunk(
  'sale/fetchResellerSale',
  async (data, {dispatch, getState}) => {
    try {
      console.log('fetchResellerSale', data);
      const {result} = await api.get(`customer/affiliated-sales`);
      console.log('fetchResellerSale', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);
