import * as actions from '../actions/appActions';

/**
 * Actions
 */
export default {
  [actions.checkVersion.pending]: (state, {payload}) => {
    state.isLoading = true;
  },
  [actions.checkVersion.fulfilled]: (state, {payload}) => {
    state.version = payload;
    state.isLoading = false;
  },
};
