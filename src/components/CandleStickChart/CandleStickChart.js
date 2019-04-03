import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import { chartDataSelector } from '../../store';
// import styles from './CandleStickChart.module.css';

class CandleStickChart extends PureComponent {
  render() {
    const {
      symbol, data, height, margin, ratio, type, width,
    } = this.props;

    const xAccessor = d => d.date;
    const xExtents = [
      xAccessor(data[0]),
      xAccessor(data[data.length - 1]),
    ];

    return (
      <ChartCanvas
        height={height}
        width={width}
        ratio={ratio}
        margin={margin}
        data={data}
        // displayXAccessor={xAccessor}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
        seriesName={symbol}
        type={type}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={2} />
          <YAxis axisAt="left" orient="left" ticks={6} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    );
  }

  static defaultProps = {
    height: 300,
    margin: {
      left: 50, right: 50, top: 50, bottom: 50,
    },
    ratio: 1,
    type: 'hybrid', // 'svg'
    width: 200,
  }
}

const mapStateToProps = (state, props) => ({
  data: chartDataSelector(state, props),
});

export default connect(
  mapStateToProps,
  null,
)(CandleStickChart);
