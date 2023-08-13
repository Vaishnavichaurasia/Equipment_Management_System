import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import Sidebar from "./Sidebar";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/twitterIcon.png";
import { FaBell, FaGlobe, FaHome, FaPhone } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdSupport } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Popconfirm, message } from "antd";
import Footer from "./Footer";
import { Message, tokenRecheck } from "../../App";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [sidebar, setSidebar] = useState(true);

  const navigate = useNavigate();

  const linkOpen = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const confirm = (props) => {
    localStorage.removeItem("token");
    navigate("/login");
    localStorage.clear();
    tokenRecheck();
    Message("Successfully logged out", "warning");
  };
  const cancel = (e) => {};

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
    if (windowSize.innerWidth < 767) {
      document.getElementById("drawer").style.display = "flex";
      setSidebar(false);
    } else if (windowSize.innerWidth == 767) {
      document.getElementById("drawer").style.display = "none";
      setSidebar(false);
    } else if (windowSize.innerWidth > 767) {
      document.getElementById("drawer").style.display = "none";
      setSidebar(true);
    }
  }, [windowSize]);

  return (
    <>
      <nav className={style.header_container} id="header">
        <div className={style.hamburger_menu} id="drawer">
          <GiHamburgerMenu
            style={{ fontSize: "30px", margin: "auto auto" }}
            onClick={(e) => setSidebar(!sidebar)}
          />
        </div>

        <div className={style.logo_div}>
          <Link to="/Dashboard" className={style.logo_link}>
            <img className={style.logo} src={logo} height={"30px"} />
          </Link>
        </div>

        <div className={menuOpen ? style.mobile_menu_link : style.menu_link}>
          <ul>
            <li className={style.links_div}>
              <NavLink
                className={style.link}
                onClick={(e) => {
                  if (windowSize.innerWidth < 767) {
                    setMenuOpen(!menuOpen);
                    setSidebar(false);
                  }
                }}
                to="/Dashboard"
              >
                <FaHome className={style.icons} />
                Home
              </NavLink>
            </li>
            <li className={style.links_div}>
              <NavLink
                className={style.link}
                onClick={(e) => {
                  if (windowSize.innerWidth < 767) {
                    setMenuOpen(!menuOpen);
                    setSidebar(false);
                  }
                }}
                to="/Contact"
              >
                <FaPhone className={style.icons} id="link" />
                Contact
              </NavLink>
            </li>
            <li className={style.links_div}>
              <NavLink
                className={style.link}
                onClick={(e) => {
                  if (windowSize.innerWidth < 767) {
                    setMenuOpen(!menuOpen);
                    setSidebar(false);
                  }
                }}
                to="/SettingForm"
              >
                <IoMdSettings className={style.icons} />
                Setting
              </NavLink>
            </li>
            <li className={style.links_div}>
              <NavLink
                className={style.link}
                onClick={(e) => {
                  if (windowSize.innerWidth < 767) {
                    setMenuOpen(!menuOpen);
                    setSidebar(false);
                  }
                }}
                to="/About"
              >
                <FaGlobe className={style.icons} />
                About
              </NavLink>
            </li>
            <li className={style.logout_link_div}>
              <Popconfirm
                className={style.link}
                title="Are you sure you want to logout?"
                onConfirm={confirm}
                onCancel={cancel}
                cancelText="Cancel"
                okText="Ok"
              >
                <RiLogoutBoxFill className={style.icons} />
                Logout
              </Popconfirm>
            </li>
          </ul>
        </div>

        <div className={style.btn_div}>
          <ul className={style.logout_btn_div}>
            <li>
              <Popconfirm
                className={style.logout_popup}
                title="Are you sure you want to logout?"
                onConfirm={confirm}
                onCancel={cancel}
                cancelText="Cancel"
                okText="Ok"
              >
                <div className={style.logout}>Logout</div>
              </Popconfirm>
            </li>
          </ul>

          <div className={style.hamburger_menu}>
            <SlOptionsVertical
              style={{ fontSize: "22px", color: "blue", margin: "auto auto" }}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>
      </nav>

      <div
        className={style.content_and_sideBar}
        onClick={(e) => {
          setMenuOpen(false);
        }}
      >
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className={style.content}>{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Header;
