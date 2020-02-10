import { createSelector } from 'reselect';
import { get } from 'lodash';
import { REGULAR } from '../constants';
import { getPrevDate } from '../helpers';

export const snapshotSelector = state => get(state, 'snapshot');
export const isLoadingSelector = state => get(state, 'isLoading');

export const allSnapshotsSelector = state => get(state, 'snapshot.symbols') || [];

export const symbolSnapshotSelector = createSelector(
  allSnapshotsSelector,
  (state, props) => props.symbol,
  (symbols, symbol) => get(symbols.find(item => item.symbol === symbol), 'snap'),
);

export const currentCandleSelector = createSelector(
  symbolSnapshotSelector,
  (snap) => {
    if (!snap) return {};
    const { candles, current } = snap;

    return candles.find(el => el.date === current.date) || {};
  },
);

export const prevCandleSelector = createSelector(
  symbolSnapshotSelector,
  (snap) => {
    if (!snap) return {};
    const { candles, current } = snap;

    return candles.find(el => el.date === getPrevDate(current.date)) || {};
  },
);

export const chartDataSelector = createSelector( // TODO should be 2 selectors
  symbolSnapshotSelector,
  currentCandleSelector,
  prevCandleSelector,
  (state, props) => props.useCandles,
  (snapshot, currentCandle, prevCandle, useCandles) => {
    const { prev, current } = snapshot;
    const { date, status } = current;
    const isRegular = status === REGULAR;

    const date0 = new Date(date);
    date0.setDate(date0.getDate() - 2);
    const date1 = new Date(date);
    date1.setDate(date1.getDate() - 1);
    const date2 = new Date(date);
    const date3 = new Date(date);
    date3.setDate(date3.getDate() + 1);

    if (useCandles) {
      return [{
        date: date0,
      }, {
        date: date1,
        open: prevCandle.o,
        high: prevCandle.h,
        low: prevCandle.l,
        close: prevCandle.c,
        volume: prevCandle.v,
      }, {
        date: date2,
        open: currentCandle.o,
        high: currentCandle.h,
        low: currentCandle.l,
        close: currentCandle.c,
        volume: currentCandle.v,
      }, {
        date: date3,
      }];
    }

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
