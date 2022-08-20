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
  [actions.fetchAllBanners.pending]: (state, {payload}) => {
    state.product.bannerFetching = true;
  },
  [actions.fetchAllBanners.fulfilled]: (state, {payload}) => {
    state.product.bannerFetching = false;
    state.product.banners = payload;
  },

  [actions.searchProducts.pending]: (state, {payload}) => {
    state.product.searchFetching = true;
  },
  [actions.searchProducts.fulfilled]: (state, {payload}) => {
    state.product.searchFetching = false;
    state.product.searches = payload;
  },

  [actions.fetchRelatedProducts.fulfilled]: (state, {payload}) => {
    // state.product.searchFetching = false;
    state.product.relatedProducts = payload;
  },

  [actions.fetchAllProductsByCat.fulfilled]: (state, {payload}) => {
    // state.product.searchFetching = false;
    state.product.productsByCat = payload;
  },
};
