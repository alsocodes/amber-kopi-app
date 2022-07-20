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
  async ({email, password}, {dispatch}) => {
    try {
      // Try auth user
      const {result} = await api.post('/login', {
        email: email || 0,
        password: password || 0,
        from: 'APP',
      });

      if (!result.access_token || !result.user?.business) {
        throw new Error('Failed to authenticate user!');
      }

      // FIX KLUTO
      // const {accesses} = result.user;

      // if (!accesses.includes('record_invoice_payments')) {
      //   throw new Error(
      //     "You don't have permission to log into POS app! permission required: record_invoice_payments",
      //   );
      // }

      // Reset shift options
      // dispatch(optionReset());

      // Store auth token
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
