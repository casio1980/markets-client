import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isLoadingSelector } from '../../store';
import loader from './loader.gif';

class Loader extends PureComponent {
  render() {
    return (
      this.props.isLoading && <img src={loader} alt="Loader" />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
});

export default connect(
  mapStateToProps,
  null,
)(Loader);
