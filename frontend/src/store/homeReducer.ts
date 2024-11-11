import * as actionTypes from './actions';
//light, dark
export const initialState = {
  theme: 'light',
  expandedIndexs: [0],
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME_HOME:
      return {
        ...state,
        theme: action.theme,
      };

    case actionTypes.SET_EXPANDED_INDEXS:
      return {
        ...state,
        expandedIndexs: action.payload,
      };
    default:
      return state;
  }
};
export default homeReducer;
