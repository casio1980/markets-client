import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allSymbolsSelector } from '../../store';
// import './App.css';

class Header extends Component {
  render() {
    const { symbols } = this.props;
    const items = symbols.map(item => <p key={item}>{item}</p>);

    return (
      <header className="App-header">
        {items}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  symbols: allSymbolsSelector(state),
});

// const mapDispatchToProps = dispatch => ({
//   loadSnapshot: () => dispatch(ACTIONS.createItem(item)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Header);
