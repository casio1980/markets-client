import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { loadSnapshot } from './store';
import { Header } from './components/Header';
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
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header className="App-header" />
        </div>
      </Provider>
    );
  }
}

export default App;
