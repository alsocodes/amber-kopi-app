import * as actions from '../actions/saleActions';

/**
 * Actions
 */
export default {
  [actions.fetchCartProducts.pending]: (state, {payload}) => {
    // state.isLoading = true;
  },
  [actions.fetchCartProducts.fulfilled]: (state, {payload}) => {
    // state.isLoading = false;
    state.cartProducts = payload;
  },
  [actions.createCart]: (state, {payload}) => {
    if (payload) {
      const carts = [...state.carts];
      // console.log('create carts', carts);
      const {variantId, inType, qty} = payload;
      const findIndex = carts.findIndex(
        a => a.variantId === variantId && a.inType === inType,
      );

      if (findIndex > -1) {
        state.carts = carts.map(a => {
          if (a.variantId === variantId && a.inType === inType) {
            return {
              ...a,
              qty: a.qty + qty,
            };
          }
          return a;
        }, []);
      } else {
        state.carts = [...carts, {...payload, id: new Date().getTime()}];
      }

      state.actionResult = {
        type: 'addToCart',
      };
    }
  },
  [actions.resetActionResult]: (state, {payload}) => {
    // console.log('triggered disini');
    state.actionResult = null;
  },
  [actions.resetSale]: (state, {payload}) => {
    state.sale = null;
  },

  [actions.deleteCart]: (state, {payload}) => {
    const carts = [...state.carts];
    // console.log(payload);
    if (payload < 0) state.carts = carts.filter(a => a.selected !== true, []);
    else {
      state.carts = carts.filter(a => a.id !== payload, []);
    }
    // state.actionResult = {
    //   type: 'updateCart',
    // };
  },

  [actions.updateCart]: (state, {payload}) => {
    const {id, inType, qty, selected} = payload;
    const carts = [...state.carts];
    // console.log('update carts', carts);
    state.carts = carts.map(a => {
      if (a.id === id) {
        const tmp = {
          ...a,
          inType: inType,
          qty: qty,
        };
        if (selected !== undefined) {
          tmp['selected'] = selected;
        }
        return tmp;
      }
      return a;
    }, []);
    // state.actionResult = {
    //   type: 'updateCart',
    // };
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
    // state.ongkir = null;
  },

  [actions.fetchOngkir.fulfilled]: (state, {payload}) => {
    state.ongkir = payload;
    state.isLoading = false;
  },

  [actions.createSales.pending]: (state, {payload}) => {
    state.creatingSale = true;
  },
  [actions.createSales.fulfilled]: (state, {payload}) => {
    state.creatingSale = false;
    // console.log('payloadx', payload);
    if (payload) {
      state.actionResult = {
        type: 'createSale',
        id: payload.id,
      };
    }
  },

  [actions.fetchSales.pending]: (state, {payload}) => {
    state.salesFetching = true;
  },

  [actions.fetchSales.fulfilled]: (state, {payload}) => {
    state.salesFetching = false;
    state.sales = payload;
  },

  [actions.fetchActiveSales.pending]: (state, {payload}) => {
    state.activesalesFetching = true;
  },

  [actions.fetchActiveSales.fulfilled]: (state, {payload}) => {
    state.activesalesFetching = false;
    state.activeSales = payload;
  },

  [actions.fetchSale.pending]: (state, {payload}) => {
    state.saleFetching = true;
  },

  [actions.fetchSale.fulfilled]: (state, {payload}) => {
    state.saleFetching = false;
    state.sale = payload;
  },

  [actions.fetchBankaccounts.fulfilled]: (state, {payload}) => {
    state.bankaccounts = payload;
  },
  [actions.createConfirmPayment.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.createConfirmPayment.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    state.actionResult = payload;
  },

  [actions.fetchBusiness.fulfilled]: (state, {payload}) => {
    state.business = payload;
  },

  [actions.fetchTracking.pending]: (state, {payload}) => {
    state.trackingFetching = true;
  },

  [actions.fetchTracking.fulfilled]: (state, {payload}) => {
    state.trackingFetching = false;
    state.tracking = payload;
  },

  [actions.fetchResellerSale.pending]: (state, {payload}) => {
    state.resellerSalesFetching = true;
  },

  [actions.fetchResellerSale.fulfilled]: (state, {payload}) => {
    state.resellerSalesFetching = false;
    state.resellerSales = payload;
  },
};
