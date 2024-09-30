import * as actionTypes from './actions';

export const initialState = {
    theme: 'dark'
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
