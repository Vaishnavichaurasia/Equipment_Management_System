import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Pages/Auth/Registration";
import Login from "./Pages/Auth/Login";
import Forget from "./Pages/Auth/ForgetPassword";
import style from "./app.module.css";
import { useEffect, useState } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Dashboard from "./Pages/Home/Dashboard";
import Header from "./Pages/GlobalComponent/Header";
import { tokenValidationAPI } from "./Api/services";
import EquipmentType from './Pages/EquipmentType/EquipmentType';
import EquipmentTypeForm from './Pages/EquipmentType/EquipmentTypeForm';
import Contact from './Pages/Component/Contact';
import About from './Pages/Component/About';

var Message = 0;
var AutoValidateToken = 0;
var tokenRecheck = 0;
var enableHeader = 0;
var disableHeader = 0;
function App() {
  const [isSuccessfull, setSuccessfull] = useState(false);
  const [notificationType, setNotification] = useState("success");
  const [notificationText, setNotificationText] = useState("SuccessFully");
  const [tokenExist, setTokenExist] = useState(false); // I change this statement true to false in 04-06-23

  useEffect(() => {
    tokenRecheck();
  }, []);

  tokenRecheck = () => {
    if (localStorage.getItem("token")) {
      setTokenExist(true);
    } else {
      setTokenExist(false);
    }
  };

  Message = (text, type) => {
    setNotificationText(text);
    setNotification(type);
    setSuccessfull(true);
    setTimeout(() => {
      setSuccessfull(false);
    }, 3000);
  };

  AutoValidateToken = async () => {
    console.log(typeof localStorage.getItem("refresh_token") == "string");
    if (localStorage.getItem("refresh_token")) {
      const tokens = {
        access: localStorage.getItem("token"),
        refresh: localStorage.getItem("refresh_token"),
      };
      await tokenValidationAPI(tokens).then((r) => {
        if (r) {
          localStorage.setItem("token", r.access_token);
          localStorage.setItem("refresh_token", r.refresh_token);
          tokenRecheck();
        } else {
          localStorage.clear();
          tokenRecheck();
          window.location = "/Login";
          Message("Unathenticate ! please login again");
        }
      });
    } else {
      localStorage.clear();
    }
  };

  setInterval(AutoValidateToken, 72000);

  enableHeader = () => {
    if (document.getElementById("header")) {
      document.getElementById("header").style.display = "grid";
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("footer").style.display = "block";
    }
  };

  disableHeader = () => {
    if (document.getElementById("header")) {
      document.getElementById("header").style.display = "none";
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("footer").style.display = "none";
    }
  };

  return (
    <>
      {isSuccessfull ? (
        <Alert
          maxW="350px"
          status={notificationType}
          className={`${style.label} ${style.alert}`}
          id="pot"
        >
          <AlertIcon />
          {notificationText}
        </Alert>
      ) : null}

      <Routes>
        <Route
          path="/Registration"
          element={tokenExist ? <Navigate to="/Dashboard" /> : <Registration />}
        />
        <Route
          path="/Login"
          element={tokenExist ? <Navigate to="/Dashboard" /> : <Login />}
        />
        <Route
          path="/Forget"
          element={tokenExist ? <Navigate to="/Dashboard" /> : <Forget />}
        />
      </Routes>



      <Header>
        <Routes>
          <Route
            path="/Dashboard"
            element={!tokenExist ? <Navigate to="/Login" /> : <Dashboard />}
          />

          <Route exact path="/equipment-type" element={<EquipmentType />} />

          <Route path="/equipment-type-form" element={<EquipmentTypeForm />} />
          <Route
            path="/Contact"
            element={<Contact />}
          />
          {/* <Route exact path="/captcha" element={<Captcha/>} /> */}

          <Route
          path="/About"
          element={<About />}
        />
      </Routes>

      </Header>
    </>
  );
}

export default App;

export {
  Message,
  AutoValidateToken,
  tokenRecheck,
  enableHeader,
  disableHeader,
};
