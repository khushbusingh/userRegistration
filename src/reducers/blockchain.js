import {
  SET_IMAGE,
  REGISTER_DATA,
  ALL_USERS,
  SET_SLIDE_DATA
} from "../actions/types";


import { sampleBase64Img, sampleBaseQrCode } from "../constants/constData";

const initialState = {
  name: "xyz", 
  email: "xyz@xyz.com", 
  designation: "xyz", 
  qrCode: sampleBaseQrCode,
  avatarImg: sampleBase64Img,
  allUsers: [],
  updated: false
};

function registerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_IMAGE:
      return {...state, imageSrc: payload};
    case REGISTER_DATA:
      const { currentUser } = payload.data;
      const currAllUsers = state.allUsers;
      currAllUsers.unshift(currentUser)
        return {...state, ...currentUser,allUsers:currAllUsers , updated: true};
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