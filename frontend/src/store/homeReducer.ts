import * as actionTypes from './actions';
//light, dark
export const initialState = {
  theme: 'light',
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME_HOME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};
export default homeReducer;
