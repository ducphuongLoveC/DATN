import * as actionTypes from './actions';
import Cookies from 'js-cookie';


export interface User {
  _id?: string;
  id?: string;
  name?: string;
  nickname?: string;
  profile_picture: string;
  referring?: string;
  avatar?: string;
  fa?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  accessToken: string;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get('accessToken') || '',
  user: (() => {
    try {
      const userStr = Cookies.get('user');
      console.log(userStr)
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      console.log('Parsed user from cookie:', user);
      return user;
    } catch (error) {
      console.error('Error parsing user from cookie:', error);
      return null;
    }
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
    case actionTypes.UPDATE_USER:
      const updatedUser = {
        ...state.user,
        ...action.payload,
      };
      // Cập nhật cookie khi user thay đổi
      Cookies.set('user', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    case actionTypes.UPDATE_AVATAR:
      if (!state.user) return state;
      const userWithNewAvatar = {
        ...state.user,
        profile_picture: action.payload,
      };
      Cookies.set('user', JSON.stringify(userWithNewAvatar)); 
      return {
        ...state,
        user: userWithNewAvatar,
      };
    default:
      return state;
  }
};

export default authReducer;
