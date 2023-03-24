import React, {useEffect} from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { registerUser } from "../actions/blockchain";
import "../assets/Avatar.css";

const AvatarDetails = props => {
  const { blockChain } = props;
  const latestUser =  blockChain.updated? blockChain : blockChain.allUsers[0] ;
  const { name, email, designation, qrCode, avatarImg} = latestUser || blockChain;


  return (
    <MDBContainer className="my-5">
      <MDBRow className="text-center avatar-text-center">
        <MDBCol >
          <MDBCard className="testimonial-card">
            <div className="avatar mx-auto bg-white">
              <MDBCardImage
                src={avatarImg}
                className="rounded-circle img-fluid"
              />
            </div>
            <hr />
            <MDBCardBody>
            <div className="card mb-3 qr-card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">
                      {designation}
                      </p>
                      <p className="card-text">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const mapStateToProps = (state) => {
  return {
      blockChain: state.blockChainReducer || {},
      name: state.blockChainReducer.name
  };
};

export default connect(mapStateToProps, {
  registerUser
})(AvatarDetails);