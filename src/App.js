import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/Login.css";
import "./assets/App.css";
import RegistrationForm from './components/registration'
import AvatarDetails from './components/avatar-details'
import AutoPlay from './components/all-stacked-details'
import videoBg from './images/corp.mp4';
import { realFeedData } from "./constants/constData";


export default function App() {
  return (
    <div className="landingpage">
       <video src={videoBg} autoPlay muted loop className="bg-vid" />
       <div className="main-container">
       <div className="realData">
       {realFeedData.map((feed, index )=> {
          return (<marquee SCROLLDELAY="10" behavior="scroll" loop="infinite" scrollamount="2"><span>{feed}</span></marquee>)
       })
      }
       </div>
          <div className="form-details-container">
            <RegistrationForm />
            <AvatarDetails />
          </div>
          <div className="stacked-details">
            <AutoPlay/>
          </div> 
        </div>
    </div>
  )
}