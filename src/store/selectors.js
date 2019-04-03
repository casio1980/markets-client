import { createSelector } from 'reselect';
import { get } from 'lodash';

export const snapshotSelector = state => get(state, 'snapshot');
export const isLoadingSelector = state => get(state, 'isLoading');

export const allSnapshotsSelector = state => get(state, 'snapshot.symbols') || [];

export const symbolSnapshotSelector = createSelector(
  allSnapshotsSelector,
  (state, props) => props.symbol,
  (symbols, symbol) => get(symbols.find(item => item.symbol === symbol), 'snap'),
);

export const chartDataSelector = createSelector(
  symbolSnapshotSelector,
  (snapshot) => {
    const { prev, current } = snapshot;
    return [{
      date: new Date(2012, 0, 1),
      open: prev.regularMarketOpen,
      high: prev.regularMarketDayHigh,
      low: prev.regularMarketDayLow,
      close: prev.regularMarketPrice,
      volume: 0,
    }, {
      date: new Date(2012, 0, 2),
      open: current.regularMarketOpen,
      high: current.regularMarketDayHigh,
      low: current.regularMarketDayLow,
      close: current.regularMarketPrice,
      volume: 0,
    }];
  },
);
