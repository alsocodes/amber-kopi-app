import {createSlice} from '@reduxjs/toolkit';
import reducers from '../reducers/app';

/** States */
const initialState = {
  isLoading: false,
  version: null,
};

/** Slice */
const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: reducers,
});

export default appSlice;
