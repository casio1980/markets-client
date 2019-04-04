import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { CrossHairCursor, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { chartDataSelector } from '../../store';
// import styles from './CandleStickChart.module.css';

class CandleStickChart extends PureComponent {
  render() {
    const {
      symbol, data: initialData, height, margin, ratio, type, width,
    } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);

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
        xScale={xScale}
        xExtents={xExtents}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        seriesName={symbol}
        type={type}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={4} />
          <YAxis axisAt="left" orient="left" ticks={6} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')} />
          <CandlestickSeries />
        </Chart>
        <CrossHairCursor />
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
    width: 300,
  }
}

const mapStateToProps = (state, props) => ({
  data: chartDataSelector(state, props),
});

export default connect(
  mapStateToProps,
  null,
)(CandleStickChart);
