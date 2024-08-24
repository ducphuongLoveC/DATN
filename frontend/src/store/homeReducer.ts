import * as actionTypes from './actions';

export const initialState = {
    theme: 'dark',
    opened: false,
};

const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.TOGGLE_THEME_HOME:
            return {
                ...state,
                theme: action.theme,
            };

        case actionTypes.SET_MENU_HOME_MOBILE:
            return {
                ...state,
                opened: action.opened,
            };
        default:
            return state;
    }
};
export default homeReducer;
