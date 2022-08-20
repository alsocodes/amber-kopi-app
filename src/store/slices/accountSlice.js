import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/account';

/** States */
const initialState = {
  isLoading: false,
  actionResult: null,
  addresses: [],
  profile: null,
};

/** Slice */
const accountSlice = createSlice({
  name: 'account',
  initialState,
  extraReducers: reducers,
});

export default accountSlice;
