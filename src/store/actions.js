import {
  SET_LOADING_STATE,
  LOAD_SNAPSHOT_PENDING,
  LOAD_SNAPSHOT_SUCCESS,
  LOAD_SNAPSHOT_FAILED,
} from './action-types';

export const setLoadingState = isLoading => ({
  type: SET_LOADING_STATE,
  payload: isLoading,
});

export const loadSnapshotPending = () => ({
  type: LOAD_SNAPSHOT_PENDING,
  payload: null,
});

export const loadSnapshotSuccess = data => ({
  type: LOAD_SNAPSHOT_SUCCESS,
  payload: data,
});

export const loadSnapshotFailed = err => ({
  type: LOAD_SNAPSHOT_FAILED,
  payload: err,
});

export const loadSnapshot = () => (dispatch) => {
  dispatch(loadSnapshotPending());

  const url = 'http://wsrv:3001/snap';
  const query = `{
    symbols {
      symbol,
      snap {
        status,
        signalBuy,
        prev {
          regularMarketDayHigh,
          regularMarketDayLow,
          regularMarketOpen,
          regularMarketPrice
        },
        current {
          preMarketPrice,
          regularMarketDayHigh,
          regularMarketDayLow,
          regularMarketOpen,
          regularMarketPrice
        },
        decision {
          signalPrice,
          buyPrice,
          takeProfit,
          stopLoss,
          decisionType
        },
        strategy {
          yield
        }
      }
    }
  }`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then(response => response.json())
    .then(json => json.data)
    .then(data => dispatch(loadSnapshotSuccess(data)))
    .catch(err => dispatch(loadSnapshotFailed(err)));
};
