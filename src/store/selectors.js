import { createSelector } from 'reselect';
import { get } from 'lodash';

export const snapshotSelector = state => get(state, 'snapshot');
export const snapshotSymbolsSelector = state => get(state, 'snapshot.symbols') || [];

export const allSymbolsSelector = createSelector(
  snapshotSymbolsSelector,
  symbols => symbols.map(item => item.symbol),
);
