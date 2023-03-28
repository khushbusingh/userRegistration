import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Sliders from './sliders';
import "../assets/App.css";
import { getAllUsers } from "../actions/blockchain";

const  AllUserSlider = (props) => {
  useEffect( () => {
    props.getAllUsers();
  }, []);
  const { loader } = props.blockChain;
  return (
      <>              
         {loader ?  <div className="loading-spinner"></div>:
         <Sliders/>}
      </>
    
  );
}

const mapStateToProps = (state) => {
  return {
      blockChain: state.blockChainReducer || {},
  };
};

export default connect(mapStateToProps, {
  getAllUsers
})(AllUserSlider);