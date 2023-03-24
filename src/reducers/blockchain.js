import {
  SET_IMAGE,
  SET_FORM_DATA,
  ALL_USERS,
  SET_SLIDE_DATA
} from "../actions/types";

import qrCode from "../images/qrcode-sample.png";
import avatarImg from "../images/avatar.png";

const initialState = {
  name: "xyz", 
  email: "xyz@xyz.com", 
  designation: "xyz", 
  qrCode: qrCode,
  avatarImg: avatarImg,
  allUsers: [],
  updated: false
};

function registerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_IMAGE:
      return {...state, imageSrc: payload};
    case SET_FORM_DATA:
      const { currentuser,allUsers } = payload.data
      return {...state, ...currentuser,allUsers, updated: true};
    case ALL_USERS:{
      return { ...state, ...payload.data}
    }
    case SET_SLIDE_DATA: {
      const currIndex = payload.index
      const currentIdexData = state.allUsers[currIndex];
      return {...state, ...currentIdexData, updated: true};
    }
    default:
      return state;
  }
};

export default registerReducer;