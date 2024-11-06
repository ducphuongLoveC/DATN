// import * as actionTypes from './actions';

// const initialState = {
//   accessToken: localStorage.getItem('accessToken') || '',
//   user: (() => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null; 
//   })(),
// };

// const authReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case actionTypes.SET_ACCESS_TOKEN:
//       return {
//         ...state,
//         accessToken: action.payload,
//       };
//     case actionTypes.SET_USER:
//       return {
//         ...state,
//         user: action.payload,
//       };
//     default:
//       return state; 
//   }
// };

// export default authReducer;



import * as actionTypes from './actions';
import Cookies from 'js-cookie';

const initialState = {
  accessToken: Cookies.get('accessToken') || '', 
  user: (() => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null; 
  })(),
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state; 
  }
};

export default authReducer;
