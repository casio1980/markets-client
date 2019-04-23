import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CandleStickChart } from '..';
import { symbolSnapshotSelector } from '../../store';
import {
  REGULAR, PROFIT, LOSS, BOTH,
} from '../../constants';
import styles from './Section.module.css';

class Section extends PureComponent {
  render() {
    const { symbol, snapshot } = this.props;
    if (!snapshot) {
      return null;
    }

    const {
      decision, strategy, signalBuy, current,
    } = snapshot;
    const {
      buyPrice, takeProfit, stopLoss, decisionType,
    } = decision;
    const { date, status } = current;

    const profitClassName = [PROFIT, BOTH].includes(decisionType) ? styles.green : null;
    const lossClassName = [LOSS, BOTH].includes(decisionType) ? styles.red : null;

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
          <div className={[styles.data, status !== REGULAR ? styles.gray : null].join(' ')}>
            {signalBuy && <div>
              <p className={styles.primary_data}>Buy @ <b>{buyPrice}</b></p>
              <p className={profitClassName}>Profit: <b>{takeProfit}</b></p>
              <p className={lossClassName}>Stop: <b>{stopLoss}</b></p>
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
});

export default connect(
  mapStateToProps,
  null,
)(Section);
