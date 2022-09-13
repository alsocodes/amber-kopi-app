import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Toast} from 'native-base';
import api from '../../services/api';
import {showToast} from '../../services/utils';
// import {optionReset} from './shiftActions';

/**
 * Action creators
 */
export const logout = createAction('AUTH_LOGOUT');
export const loginFailed = createAction('LOGIN_FAILED');
export const setOutlet = createAction('AUTH_SET_OUTLET');
export const resetActionResult = createAction('RESET_ACTION_RESULT');

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
      Toast.show({
        title: err.message,
        placement: 'bottom',
        bgColor: 'red.600',
      });
      dispatch(loginFailed(err.message));
      throw err;
      // return null;
    }
  },
);

/**
 * Request for user password reset
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async params => {
    try {
      const {message} = await api.post('/auth/forgot', params);

      showToast(true, 'Sukses!', message);
    } catch (err) {
      showToast(false, 'Gagal!', err.message);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (data, {dispatch}) => {
    try {
      // console.log('result login', emailOrPhone);
      // Try auth user
      const {result} = await api.post('/auth/signup', data);

      console.log(result);

      return result;
    } catch (err) {
      // Cannot login!
      Toast.show({
        title: err.message,
        placement: 'bottom',
        bgColor: 'red.600',
      });
      dispatch(loginFailed(err.message));
      throw err;
    }
  },
);
