import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/auth';

/** States */
const initialState = {
  accessToken: null,
  user: null,
  loggedIn: false,
  outlet: null,
  loading: false,
  actionResult: null,
};

/** Slice */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: reducers,
  // reducers: reducers,
});

export default authSlice;
