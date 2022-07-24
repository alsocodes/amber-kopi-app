import * as actions from '../actions/saleActions';

/**
 * Actions
 */
export default {
  [actions.createCart.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.createCart.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    // console.log('payloadx', payload);
    if (payload) {
      state.actionResult = {
        type: 'addToCart',
      };
    }
  },
  [actions.resetActionResult]: (state, {payload}) => {
    console.log('triggered disini');
    state.actionResult = null;
  },
  [actions.fetchCarts.pending]: (state, {payload}) => {
    state.isLoading = true;
  },

  [actions.fetchCarts.fulfilled]: (state, {payload}) => {
    state.carts = payload;
    state.isLoading = false;
  },

  [actions.deleteCarts.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.deleteCarts.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    if (payload) {
      state.actionResult = {
        type: 'deleteCart',
      };
    }
  },

  [actions.updateCarts.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.updateCarts.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    if (payload) {
      state.actionResult = {
        type: 'updateCart',
      };
    }
  },

  [actions.fetchOutlets.pending]: (state, {payload}) => {
    state.isLoading = true;
  },

  [actions.fetchOutlets.fulfilled]: (state, {payload}) => {
    state.outlets = payload;
    state.isLoading = false;
  },

  [actions.fetchOngkir.pending]: (state, {payload}) => {
    state.isLoading = true;
    state.ongkir = null;
  },

  [actions.fetchOngkir.fulfilled]: (state, {payload}) => {
    state.ongkir = payload;
    state.isLoading = false;
  },
};
