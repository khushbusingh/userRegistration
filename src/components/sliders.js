import React from "react";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/thumbs/thumbs.min.css';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import "../assets/Avatar.css";
import "../assets/Sliders.css";
import { setSlideClick } from "../actions/blockchain";


const Sliders = props => {
  const sliderData = props.blockChain.allUsers || []
  if (!Array.isArray(sliderData) || sliderData.length <= 0) {
    return null;
  }
  function setSlideClick(index) {
    props.setSlideClick(index)
  }

  return (
    <>
      <Swiper
      effect={"coverflow"}
    spaceBetween={0}
    grabCursor={true}
    centeredSlides={true}
    loop={true}
    slidesPerView={"auto"}
    // autoplay={{
    //    delay: 100,
    //    disableOnInteraction: false,
    //  }}
     coverflowEffect={{
      rotate: 1,
      stretch: 1,
      depth: 100,
      modifier: 5,
    }}
     pagination={{
       clickable: true,
     }}
     navigation={true}
     modules={[EffectCoverflow,Autoplay, Pagination, Navigation]}
     className="swiper_container"
   >
        {sliderData.map((slide, index) => {
          let { qrCode, photo, name, email, designation } = slide;
          return (
            <SwiperSlide>
              <div key={index} className="carousel-details-slider-1" onClick={() => setSlideClick(index)}>
                <MDBContainer className="my-5 carousel-details-card-1 my-5-slider">
                  <MDBRow className="text-center carousel-text-center">
                    <MDBCol>
                      <MDBCard id="testimonial-slide-card-1">
                        <div className="avatar-1 mx-auto bg-white">
                          <MDBCardImage
                            src={`data:image/png;base64,${photo}`}
                            className="rounded-circle img-fluid"
                          />
                        </div>
                      

                        <MDBCardBody className="carousel-body-slider" >
                          <div className="card mb-3 qr-card-1">
                            <div className="row g-0 slider-g-0">
                              <div className="col-md-4">
                                <img
                                  src={`data:image/png;base64,${qrCode}`}
                                  alt="QR Code"
                                  className="img-fluid rounded-start"
                                />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title">{name}</h5>
                                  <p className="card-text">{designation}</p>
                                  <p className="card-text">{email}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
      blockChain: state.blockChainReducer || {},
  };
};

export default connect(mapStateToProps, {
  setSlideClick
})(Sliders);

