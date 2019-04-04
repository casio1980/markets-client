import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CandleStickChart } from '..';
import { symbolSnapshotSelector } from '../../store';
import styles from './Section.module.css';

class Section extends PureComponent {
  render() {
    const { symbol, snapshot } = this.props;
    if (!snapshot) {
      return null;
    }

    const {
      prev, current, decision, strategy, signalBuy, status,
    } = snapshot;
    const {
      signalPrice, buyPrice, takeProfit, stopLoss, decisionType,
    } = decision;

    // console.log('>>>', prev, current, decision, signalBuy, status);

    return (
      <section className={styles.section}>
        <header className={styles.header}>
          {symbol} :: {status}
          <aside className={styles.header_aside}>
            {strategy && strategy.yield}
          </aside>
        </header>
        <CandleStickChart
          symbol={symbol}
        />
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
