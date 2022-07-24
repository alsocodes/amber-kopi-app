import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import saleSlice from './slices/saleSlice';
import accountSlice from './slices/accountSlice';

/**
 * App reducers
 */
const Reducers = {
  auth: authSlice.reducer,
  product: productSlice.reducer,
  sale: saleSlice.reducer,
  account: accountSlice.reducer,
};

export default Reducers;
