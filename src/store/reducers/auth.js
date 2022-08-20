import * as actions from '../actions/authActions';

/**
 * Reducers
 */
const logout = state => {
  state.accessToken = null;
  state.user = null;
  state.loggedIn = false;
};

const login = (state, {payload}) => {
  // Set access token
  const {user, accessToken} = payload;

  state.accessToken = accessToken;
  state.user = user;
  state.loggedIn = true;
  // state.outlet = user?.outlets[0] || null;
  state.outlet = null;
  state.loading = false;
};

const setOutlet = (state, {payload}) => {
  state.outlet = payload;
};

export default {
  [actions.logout]: logout,
  [actions.setOutlet]: setOutlet,

  // Extras
  [actions.login.fulfilled]: login,
  [actions.login.pending]: (state, {payload}) => {
    state.loading = true;
  },

  [actions.signup.pending]: (state, {payload}) => {
    state.loading = true;
  },
  [actions.signup.fulfilled]: (state, {payload}) => {
    state.loading = false;
    state.actionResult = {
      type: 'signUp',
    };
  },
  [actions.resetActionResult]: (state, {payload}) => {
    state.actionResult = null;
  },

  [actions.loginFailed]: (state, {payload}) => {
    state.loading = false;
  },

  [actions.resetPassword.pending]: (state, {payload}) => {
    state.loading = true;
  },

  [actions.resetPassword.fulfilled]: (state, {payload}) => {
    state.loading = false;
    state.actionResult = {
      type: 'resetPassword',
      success: true,
    };
  },
};
