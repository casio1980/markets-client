import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { loadSnapshot } from './store';
import { Header, Loader, Section } from './components';
import './App.css';
import { data as mockData } from './store/store.mock.json';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
class App extends Component {
  componentDidMount() {
    const data = process.env.REACT_APP_USE_MOCK === 'true' ? mockData : null;

    store.dispatch(loadSnapshot(data));

    setInterval(() => {
      store.dispatch(loadSnapshot(data));
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
        <Section
          symbol={'SOHU'}
        />
      </Provider>
    );
  }
}

export default App;
