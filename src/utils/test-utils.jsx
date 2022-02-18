import React from 'react'
import { render } from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from '../redux/rootReducer';

const thunk =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }

  

export const rdxRender = (
    ui,
    { initialState, ...renderOptions } = {}
  ) => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
  
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };