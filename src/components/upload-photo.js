import React, { useState } from 'react';
import Webcam from "react-webcam";
import { connect } from "react-redux";
import { setImageData } from "../actions/blockchain";
import "../assets/Login.css";


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    facingMode: "user"
};

const UploadPhoto = (props) => {

    const [image,setImage]=useState('');
    const [loadingCam, setLoadingCam] = useState(true);
    const webcamRef = React.useRef(null);

    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        props.setImageData(imageSrc)
        },
        [webcamRef]
        );

    const handleUserMedia = () => setTimeout(() => setLoadingCam(false), 1000);
    

    return (
        <div className="webcam-container">
           {loadingCam && <div className="spinner-container">
              <div className="loading-spinner">
              </div>
            </div> 
          }
            <div className="webcam-img">
                {image == '' ? <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    style={{ opacity: loadingCam ? 0 : 1 }}
                /> : <img src={image} />}
            </div>
            <div style={{ opacity: loadingCam ? 0 : 1 }}>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>
    );
};

export default connect(null, {
  setImageData
})(UploadPhoto);
