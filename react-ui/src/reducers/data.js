import { DATA_ERROR, DATA_CLEAR_ERROR, DATA_READ_EVENT, DATA_READ_GROUP } from '../actions';
/* eslint-disable no-console */
export default (data = {
  event: {
    id: 0, activated: false, title: '', data: '',
  },
  groups: [],
  error: '',
}, action) => {
  const { error, ...clearError } = data;
  switch (action.type) {
    case DATA_ERROR:
      console.log(`setting data.error state to ${action.payload}`);
      return { ...data, error: action.payload };
    case DATA_CLEAR_ERROR:
      return { ...clearError };
    case DATA_READ_EVENT:
      return { ...clearError, event: action.payload };
    case DATA_READ_GROUP:
      return { ...clearError, groups: [...data.groups, action.payload] };
    default:
      return data;
  }
};
