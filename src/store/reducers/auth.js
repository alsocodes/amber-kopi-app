import * as actions from '../actions/authActions';

/**
 * Reducers
 */
const logout = state => {
  state.accessToken = null;
  state.user = null;
  state.loggedIn = false;
  state.business = null;
  state.outlet = null;
};

const login = (state, {payload}) => {
  // Set access token
  const {user, access_token} = payload;

  state.accessToken = access_token;
  state.user = user;
  state.loggedIn = true;
  state.business = user.business;
  // state.outlet = user?.outlets[0] || null;
  state.outlet = null;
};

const setOutlet = (state, {payload}) => {
  state.outlet = payload;
};

export default {
  [actions.logout]: logout,
  [actions.setOutlet]: setOutlet,

  // Extras
  [actions.login.fulfilled]: login,
};
