import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import homeReducer from './homeReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  homeReducer: homeReducer,
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;