import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import api, {getImageUri} from '../../services/api';
// import axios from 'axios';

export const resetActionResult = createAction('RESET_ACTION_RESULT');

export const createAddress = createAsyncThunk(
  'sale/createAddress',
  async (data, {dispatch, getState}) => {
    try {
      const {result} = await api.post('/addresses', data);
      console.log('createAddress', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return false;
  },
);

export const fetchAddresses = createAsyncThunk(
  'sale/fetchAddresses',
  async (_, {dispatch, getState}) => {
    try {
      console.log('herexyyr');
      const {result} = await api.get('/addresses');
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const deleteAddresses = createAsyncThunk(
  'sale/deleteAddresses',
  async (id, {dispatch, getState}) => {
    try {
      console.log('herex');
      const {result} = await api.delete(`/addresses/${id}`);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);

export const updateAddresses = createAsyncThunk(
  'sale/updateAddresses',
  async (data, {dispatch, getState}) => {
    try {
      console.log('herex');
      const {result} = await api.put(`/addresses/${data.id}`, data);
      return result;
    } catch (err) {
      console.log(err);
    }

    return [];
  },
);
