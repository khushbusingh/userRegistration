import {
  SET_IMAGE,
  REGISTER_DATA,
  ALL_USERS,
  SET_SLIDE_DATA
} from "./types";

import BlockChainApiService from "../services/blockchain.service";


export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await BlockChainApiService.getAllUsers();

    dispatch({
      type: ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setImageData = imageSrc => async (dispatch) =>{
  try {
    dispatch({
      type: SET_IMAGE,
      payload: imageSrc,
    });
  } catch (err) {
    console.log(err);
  }
}

export const setSlideClick = index => async(dispatch )=> {
  try {
    dispatch({
      type: SET_SLIDE_DATA,
      payload: {index},
    });
  } catch (err) {
    console.log(err);
  }
}

export const registerUser = (payload) => async (dispatch) =>{
  try {
    const res = await BlockChainApiService.register(payload);
    dispatch({
      type: REGISTER_DATA,
      payload: res.data,
    });

    //return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
   // return Promise.reject(err);
  }
}
