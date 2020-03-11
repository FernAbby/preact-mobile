import { createStore } from 'redux';

const initValue = {
  counter: {}
};

const Actions = {
  setCounter: (state, action) => ({
    ...action.payload,
    ...state
  })
};

export default createStore((state, action) => {
  if (action && Actions[action.type]) {
    return { ...Actions[action.type](state, action), ...state };
  }
  return state;
}, initValue);
