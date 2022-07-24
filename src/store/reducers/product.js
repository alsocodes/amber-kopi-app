import * as actions from '../actions/productActions';

const setProductLoading = (state, {payload}) => {
  state.product.isLoading = payload;
};

const fetchAllProducts = (state, {payload}) => {
  state.product.products = payload || [];
};

const fetchAllCatProducts = (state, {payload}) => {
  state.product.catProducts = payload || [];
};

/**
 * Actions
 */
export default {
  [actions.setProductLoading]: setProductLoading,
  [actions.fetchAllProducts.fulfilled]: fetchAllProducts,
  [actions.fetchAllCatProducts.fulfilled]: fetchAllCatProducts,
};
