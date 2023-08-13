import React, { useEffect } from "react";
import style from "./contact.module.css";
import Header from "../GlobalComponent/Header";
import { enableHeader } from "../../App";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
  };
  
  const center = {
    lat: 21.15938799947204,
    lng: 81.79661084652828,
  };
  
  const locations = [
    { lat: 21.15938799947204, lng: 81.79661084652828, title: 'EMS' },
    //{ lat: PIN2_LATITUDE, lng: PIN2_LONGITUDE, title: 'Pin 2 Title' },
    // Add more pins as needed
  ];
  
const FooterDescription = () => {
  useEffect(() => {
    enableHeader()
  }, [])
  return (
  
    <div className={style.Container}>
        <div class="col-12">
        <br></br>
            <h3>Contact Us</h3>

            <br></br><br></br>
		
<p>Nic Chhattisgarh State Centre, Raipur<br></br>
AD2-14, 2nd Floor,<br></br>
Mahanadi Bhawan,<br></br>
Matralay, Naya Raipur Atal Nagar,<br></br>
Raipur, Chhattisgarh<br></br>
Pincode - 492002<br></br>
Office Phone No. - 0771-2221263</p>
<p>E mail :
     <em></em></p>
     <p>Website: chhattisgarh.nic.in</p>
    </div>
    <div className="App">
      <h1>Google Maps in React</h1>
      <MapComponent />
    </div>
    </div>
    
    
  );
};

function MapComponent() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAcsSWfkFw3it6Oc2uScP0H_tQeqegX2oc">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
  

export default FooterDescription;



