import {
  SET_LOADING_STATE,
  LOAD_SNAPSHOT_PENDING,
  LOAD_SNAPSHOT_SUCCESS,
  LOAD_SNAPSHOT_FAILED,
} from './action-types';

const defaultState = {
  isLoading: false,
};

const reducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING_STATE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case LOAD_SNAPSHOT_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_SNAPSHOT_SUCCESS: {
      return {
        ...state,
        snapshot: payload,
        isLoading: false,
      };
    }

    case LOAD_SNAPSHOT_FAILED: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
