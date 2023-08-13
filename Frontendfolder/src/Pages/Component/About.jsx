import React, { useEffect } from "react";
import style from "./about.module.css";
import Header from "../GlobalComponent/Header";
import { enableHeader } from "../../App";

const About = () => {
  useEffect(() => {
    enableHeader()
  }, [])
  return (
  
    <div className={style.Container}>
        <div class="col-12">
        <br></br>
            <h3>About Us</h3>

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
    </div>
  );
};
export default About;
