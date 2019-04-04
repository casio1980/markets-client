import { createSelector } from 'reselect';
import { get } from 'lodash';
import { REGULAR } from '../constants';

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
    const { prev, current, status } = snapshot;
    const isRegular = status === REGULAR;

    const date0 = new Date();
    date0.setDate(date0.getDate() - 2);
    const date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    const date2 = new Date();
    const date3 = new Date();
    date3.setDate(date3.getDate() + 1);

    return [{
      date: date0,
    }, {
      date: date1,
      open: prev.regularMarketOpen,
      high: prev.regularMarketDayHigh,
      low: prev.regularMarketDayLow,
      close: prev.regularMarketPrice,
      volume: 0,
    }, {
      date: date2,
      open: isRegular ? current.regularMarketOpen : current.preMarketPrice,
      high: isRegular ? current.regularMarketDayHigh : current.preMarketPrice,
      low: isRegular ? current.regularMarketDayLow : current.preMarketPrice,
      close: isRegular ? current.regularMarketPrice : current.preMarketPrice,
      volume: 0,
    }, {
      date: date3,
    }];
  },
);
