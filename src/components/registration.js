import React, {useState, useRef} from 'react';
import { connect } from "react-redux";
import { registerUser } from "../actions/blockchain";
import UploadPhoto from './upload-photo';
import "../assets/Login.css";


const RegistrationForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    
    const [isUpload, setUpload] = useState(false);
    const inputRef = useRef(null);
    const emailRef = useRef(null);
    const desgRef = useRef(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const uploadPhoto = (e) => {
        setUpload(true);
    }

    const submitForm = (e) => {
        if (!isValidEmail(email)) {
            setEmailError('Invalid Email');
        } else{
            setEmailError(null);
            const { imageSrc } = props.blockChain;
            if(!name || !email || !designation || !imageSrc){
                setSubmitError('Please enter all details');
            } else {
                setSubmitError(null);
                props.registerUser({name,email,designation,imageSrc});
                setName('');
                setEmail('');
                setDesignation('');
                setUpload(false);
                inputRef.current.value = "";
                emailRef.current.value = "";
                desgRef.current.value = "";
            }
        }
    }

    return (
        <div id="login">
            <div className="group">
                <input type="text" placeholder="Name" ref={inputRef} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="group">
                <input type="text" placeholder="Designation" ref={desgRef} onChange={(e) => setDesignation(e.target.value)} />
            </div>
            <div className="group">
                <input type="email" placeholder="Email"  ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <h2 style={{color: 'red'}}>{emailError}</h2>}
            </div>
            <div className="group">
                {isUpload ? <UploadPhoto/> : <button id="upload-button" onClick={(e) => uploadPhoto(e)}>Upload Photo</button> }
            </div>
            <div className="group">
             <button type="button" id="login-button" onClick={(e) => submitForm(e)}>Submit</button>
             {submitError && <h2 style={{color: 'red'}}>{submitError}</h2>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blockChain: state.blockChainReducer || {},
    };
  };

export default connect(mapStateToProps, {
    registerUser
})(RegistrationForm);