import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { allSnapshotsSelector } from '../../store';
import styles from './Nav.module.css';

class Nav extends PureComponent {
  render() {
    const { symbols } = this.props;
    const items = symbols.map(item => <span key={item}>{item}</span>);

    return (
      <nav className={styles.nav}>
        {items}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  symbols: allSnapshotsSelector(state),
});

// const mapDispatchToProps = dispatch => ({
//   loadSnapshot: () => dispatch(ACTIONS.createItem(item)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Nav);
