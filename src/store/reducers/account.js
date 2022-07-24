import * as actions from '../actions/accountActions';

/**
 * Actions
 */
export default {
  [actions.createAddress.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.createAddress.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    // console.log('payloadx', payload);
    if (payload) {
      state.actionResult = {
        type: 'addAddress',
        id: payload.id,
      };
    }
  },

  [actions.resetActionResult]: (state, {payload}) => {
    state.actionResult = null;
  },
  [actions.fetchAddresses.pending]: (state, {payload}) => {
    state.isLoading = true;
  },

  [actions.fetchAddresses.fulfilled]: (state, {payload}) => {
    state.addresses = payload;
    state.isLoading = false;
  },
};
