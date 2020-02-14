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

export const loadSnapshot = data => (dispatch) => {
  dispatch(loadSnapshotPending());

  if (data) dispatch(loadSnapshotSuccess(data));
  else {
    const url = `http://${process.env.REACT_APP_SERVER_HOST_ADDRESS}:3001/query`;
    // for specific date use: symbols(date: "2020-02-07")
    const query = `{
      symbols {
        symbol,
        snap {
          signalBuy,
          prev {
            regularMarketDayHigh,
            regularMarketDayLow,
            regularMarketOpen,
            regularMarketPrice
          },
          current {
            date,
            status,
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
          },
          candles {
            o,
            c,
            h,
            l,
            v,
            date
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
      .then(json => dispatch(loadSnapshotSuccess(json.data)))
      .catch(err => dispatch(loadSnapshotFailed(err)));
  }
};
