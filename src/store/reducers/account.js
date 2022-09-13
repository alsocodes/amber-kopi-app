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

  [actions.deleteAddresses.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.deleteAddresses.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    state.actionResult = {
      type: 'deleteAddress',
    };
  },
  [actions.updateAddresses.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.updateAddresses.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    state.actionResult = {
      type: 'updateAddress',
    };
  },

  [actions.fetchProfile.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.fetchProfile.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    state.profile = payload;
  },

  [actions.updateProfile.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.updateProfile.fulfilled]: (state, {payload}) => {
    state.isLoading = false;
    state.actionResult = {
      type: 'updateProfile',
    };
  },
};
