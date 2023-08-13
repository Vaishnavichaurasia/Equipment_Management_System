

import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./footer.module.css";
import Facebook from "../../assets/facebookIcon.webp";
import Google from "../../assets/googleIcon.png";
import Twitter from "../../assets/twitterIcon.png";
import Instagram from "../../assets/instagramIcon.png";
import YouTube from "../../assets/youtubeIcon.png";

const Footer = () => {
  const opeenSiteOfAdyant = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const footerIconsOpenNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (

    <div id="footer">
      <div className={style.footer_container}>
        <div className={style.footer_main_section}>
          <div className={style.footer_icons_section}>
            <Link
              onClick={() =>
                footerIconsOpenNewTab(
                  "https://chhattisgarh.nic.in/"
                )
              }
            >
              <img src={Facebook} className={style.facebook} />
            </Link>

            <Link
              onClick={() => footerIconsOpenNewTab("https://www.google.com/")}
            >
              <img src={Google} className={style.google} />
            </Link>

            <Link
              onClick={() =>
                footerIconsOpenNewTab("https://twitter.com/NICMeity/")
              }
            >
              <img src={Twitter} className={style.twitter} />
            </Link>

            <Link
              onClick={() =>
                footerIconsOpenNewTab(
                  "https://www.google.com/"
                )
              }
            >
              <img src={Instagram} className={style.instagram} />
            </Link>

            <Link
              onClick={() =>
                footerIconsOpenNewTab(
                  "https://www.youtube.com/"
                )
              }
            >
              <img src={YouTube} className={style.youtube} />
            </Link>
          </div>

          <h6 className={style.footer_left_text}>
            Copyright © 2023 NIC
          </h6>
          <h6
            className={style.adyant_footer_link}
            onClick={() => opeenSiteOfAdyant("https://chhattisgarh.nic.in")}
          >
            <h6 className={style.footer_right_text}>NIC</h6>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;

