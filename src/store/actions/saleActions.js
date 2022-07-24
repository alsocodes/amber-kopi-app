import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';
import axios from 'axios';

export const resetActionResult = createAction('RESET_ACTION_RESULT');

export const createCart = createAsyncThunk(
  'sale/createCart',
  async (data, {dispatch, getState}) => {
    try {
      const result = await api.post('/carts', data);
      // console.log('xx', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return false;
  },
);

export const fetchCarts = createAsyncThunk(
  'sale/fetchCarts',
  async (_, {dispatch, getState}) => {
    try {
      console.log('herexyyr');
      const {result} = await api.get('/carts');
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const deleteCarts = createAsyncThunk(
  'sale/deleteCarts',
  async (id, {dispatch, getState}) => {
    try {
      console.log('herex');
      const {result} = await api.delete(`/carts/${id}`);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const updateCarts = createAsyncThunk(
  'sale/updateCarts',
  async (data, {dispatch, getState}) => {
    try {
      console.log('herex');
      const {result} = await api.put(`/carts/${data.id}`, data);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

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

export const fetchOngkir = createAsyncThunk(
  'sale/fetchOngkir',
  async (data, {dispatch, getState}) => {
    try {
      console.log('fetch ongkir');
      const {result} = await api.get(
        `/shipping/cost?originId=${data.originId}&destinationId=${data.destinationId}&weight=${data.weight}`,
      );
      return result?.rajaongkir;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);
