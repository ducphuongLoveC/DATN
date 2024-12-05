import * as actionTypes from './actions';

export const initialState = {
  seek: undefined,
  isFirstPlayingVideo: false,
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
    case actionTypes.SET_IS_FIRST_PLAYING_VIDEO:
      return {
        ...state,
        isFirstPlayingVideo: action.payload,
      };
    case actionTypes.SET_SEEK:
      return {
        ...state,
        seek: action.payload,
      };
    default:
      return state;
  }
};
export default homeReducer;
