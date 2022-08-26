import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';

export const checkVersion = createAsyncThunk(
  'app/checkVersion',
  async (_, {dispatch, getState}) => {
    try {
      console.log('herexyyr');
      const {result} = await api.get('/app-version/check');
      console.log('result', result);
      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
);
