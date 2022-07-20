import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';

/**
 * App reducers
 */
const Reducers = {
  auth: authSlice.reducer,
  product: productSlice.reducer,
};

export default Reducers;
