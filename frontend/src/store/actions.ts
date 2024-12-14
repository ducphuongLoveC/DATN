

// action - customization reducer
const SET_MENU = '@customization/SET_MENU';
const MENU_TOGGLE = '@customization/MENU_TOGGLE';
const MENU_OPEN = '@customization/MENU_OPEN';
const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
const TOGGLE_THEME = '@customization/TOGGLE_THEME';

// action - client
const TOGGLE_THEME_HOME = '@home/TOGGLE_THEME';
const SET_EXPANDED_INDEXS = '@/home/SET_EXPANDED_INDEXS';
const SET_IS_FIRST_PLAYING_VIDEO = '@/home/SET_IS_FIRST_PLAYING_VIDEO';
const SET_SEEK = '@/home/SET_SEEK';

// auth
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';


export {
  SET_MENU,
  MENU_TOGGLE,
  MENU_OPEN,
  SET_FONT_FAMILY,
  SET_BORDER_RADIUS,
  TOGGLE_THEME,
  TOGGLE_THEME_HOME,
  SET_USER,
  SET_ACCESS_TOKEN,
  SET_EXPANDED_INDEXS,
  SET_IS_FIRST_PLAYING_VIDEO,
  SET_SEEK,
};
  
  export const updateUser = (userData: Partial<any>) => ({
    type: UPDATE_USER,
    payload: userData,
});
  
export const updateAvatar = (avatarUrl: string) => ({
  type: UPDATE_AVATAR,
  payload: avatarUrl,
});
  
 