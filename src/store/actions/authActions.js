import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Toast} from 'native-base';
import api from '../../services/api';
import {showToast} from '../../services/utils';
// import {optionReset} from './shiftActions';

/**
 * Action creators
 */
export const logout = createAction('AUTH_LOGOUT');
export const setOutlet = createAction('AUTH_SET_OUTLET');

/**
 * Authenticate user using username/email & password
 */
export const login = createAsyncThunk(
  'auth/login',
  async ({emailOrPhone, password}, {dispatch}) => {
    try {
      // console.log('result login', emailOrPhone);
      // Try auth user
      const {result} = await api.post('/auth/signin', {
        emailOrPhone: emailOrPhone || 0,
        password: password || 0,
      });

      console.log(result);

      return result;
    } catch (err) {
      // Cannot login!
      Toast.show({title: err.message});
      throw err;
    }
  },
);

/**
 * Request for user password reset
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async email => {
    try {
      const {message} = await api.post('/forgot-password', {email});

      showToast(true, 'Sukses!', message);
    } catch (err) {
      showToast(false, 'Gagal!', err.message);
    }
  },
);
