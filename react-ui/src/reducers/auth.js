import {
  USER_REGISTERED,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHECK_IF_AUTHENTICATED,
} from '../actions';

export default (auth = {}, action) => {
  const { error, ...clearError } = auth;
  switch (action.type === AUTHENTICATION_ERROR) {
    case USER_REGISTERED:
      return { ...clearError, authenticated: false };
    case USER_AUTHENTICATED:
      return { ...clearError, authenticated: true };
    case USER_UNAUTHENTICATED:
      return { ...auth, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };
    case CHECK_IF_AUTHENTICATED:
      return { ...auth };
    default:
      return auth;
  }
};
