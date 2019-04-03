import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { loadSnapshot } from './store';
import { Header, Loader, Section } from './components';
import './App.css';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
class App extends Component {
  componentDidMount() {
    store.dispatch(loadSnapshot());

    setInterval(() => {
      store.dispatch(loadSnapshot());
    }, 30 * 1000);
  }

  render() {
    return (
      <Provider store={store}>
        <Header>
          <Loader />
        </Header>
        {/* <Nav /> */}
        <Section
          symbol={'TSLA'}
        />
        <Section
          symbol={'TWTR'}
        />
        <Section
          symbol={'NVDA'}
        />
      </Provider>
    );
  }
}

export default App;
