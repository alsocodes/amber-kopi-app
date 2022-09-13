import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import saleSlice from './slices/saleSlice';
import accountSlice from './slices/accountSlice';
import appSlice from './slices/appSlice';

/**
 * App reducers
 */
const Reducers = {
  auth: authSlice.reducer,
  product: productSlice.reducer,
  sale: saleSlice.reducer,
  account: accountSlice.reducer,
  app: appSlice.reducer,
};

export default Reducers;
