import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CandleStickChart from '../CandleStickChart';
import { symbolSnapshotSelector, currentCandleSelector, prevCandleSelector } from '../../store';
import { COMISSION, REGULAR } from '../../constants';
import { fmtNumber } from '../../helpers';
import styles from './Section.module.css';

class Section extends PureComponent {
  render() {
    // TODO moving signal calculation to FE
    const {
      symbol, snapshot, currentCandle, prevCandle,
    } = this.props;
    if (!snapshot) {
      return null;
    }

    const {
      strategy, current, // signalBuy, decision
    } = snapshot;
    const { date, status } = current;

    const { o: currentOpen } = currentCandle;
    const { o: prevOpen, l: prevLow, h: prevHigh } = prevCandle;

    const signalBuy = currentOpen > prevOpen;
    const buyPrice = currentOpen;
    const comission = buyPrice * COMISSION * 2;
    const takeProfit = buyPrice + comission;
    const stopLoss = buyPrice - comission;

    const profitClassName = null; // [PROFIT, BOTH].includes(decisionType) ? styles.green : null;
    const lossClassName = null; // [LOSS, BOTH].includes(decisionType) ? styles.red : null;

    return (
      <section className={styles.section}>
        <header className={styles.header}>
          {symbol} :: {status}
          <aside className={styles.header_aside}>
            {date} :: {strategy && strategy.yield}
          </aside>
        </header>
        <div className={styles.content}>
          <CandleStickChart
            symbol={symbol}
          />
          <CandleStickChart
            symbol={symbol}
            useCandles={true}
          />
          <div className={[styles.data, status !== REGULAR ? styles.gray : null].join(' ')}>
            {signalBuy && <div>
              <p className={styles.primary_data}><button>Buy</button> @ <b>{buyPrice}</b></p>
              <p className={profitClassName}>Profit: <b>{fmtNumber(takeProfit)}</b></p>
              <p className={lossClassName}>Stop: <b>{fmtNumber(stopLoss)}</b></p>
              <p>Comission: <b>{fmtNumber(comission)}</b></p>
            </div>}
            {!signalBuy
              && <p className={styles.primary_data}>No Signal</p>}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  snapshot: symbolSnapshotSelector(state, props),
  currentCandle: currentCandleSelector(state, props),
  prevCandle: prevCandleSelector(state, props),
});

export default connect(
  mapStateToProps,
  null,
)(Section);
