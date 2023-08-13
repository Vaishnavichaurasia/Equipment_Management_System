import React, { useEffect, useState } from "react";
import style from "./sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();


  const [overlayEnable, setOverlayEnable] = useState(false);

  function closeSidebar() {
    setSidebar(false);
  }

  const navigateToDashboard = () => {
    localStorage.setItem("globalPageIndex", 1);
    localStorage.setItem("listPerPage", 10);

    if (windowSize.innerWidth < 800) setSidebar(false);

    navigate("/Dashboard");
  };

  const navigateToEqupmenttype = () => {
    
    localStorage.setItem("globalPageIndex", 1);
    localStorage.setItem("listPerPage", 10)
    
    if (windowSize.innerWidth < 800)
       setSidebar(false)
       navigate('/equipment-type');
  };

  const navigateToCaptcha = () => {
    
    localStorage.setItem("globalPageIndex", 1);
    localStorage.setItem("listPerPage", 10)
    
    if (windowSize.innerWidth < 800)
       setSidebar(false)
       navigate('/captcha');
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [window.innerWidth]);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    if (windowSize.innerWidth < 767) setOverlayEnable(true);
    else if (windowSize.innerWidth > 767) setOverlayEnable(false);
  }, [windowSize]);

  return (
    <div className={style.container} id="sidebar">
      <Drawer
        open={sidebar}
        onClose={(e) => setSidebar(!sidebar)}
        direction="left"
        className={style.drawer}
        enableOverlay={overlayEnable}
      >
        <ul
          className={sidebar == true ? style.open_sidebar : style.close_sidebar}
        >
          <li className={style.links_div} onClick={navigateToDashboard}>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : style.link
              }
              to="/Dashboard"
            >
              {" "}
              Dashboard{" "}
            </NavLink>
          </li>

          <li className={style.links_div} onClick={navigateToEqupmenttype}>
          <NavLink
            
            className={({ isActive }) => (isActive ? style.active : style.link)}
            to="/equipment-type"
          >
            {" "}
           Equipment-type
          </NavLink>
        </li>

        {/* <li className={style.links_div} onClick={navigateToCaptcha}>
          <NavLink
            
            className={({ isActive }) => (isActive ? style.active : style.link)}
            to="/captcha"
          >
            {" "}
           Captcha
          </NavLink>
        </li>
          */}
        </ul>

        <div className={style.sidebar_close_div}>
          <FaCaretLeft
            style={{ height: "6vh" }}
            onClick={closeSidebar}
            className={
              sidebar == true
                ? style.show_sidebar_closearrow
                : style.hide_sidebar_closearrow
            }
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
