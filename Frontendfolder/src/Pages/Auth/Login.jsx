import React, { useEffect, useRef, useState } from "react";
import style from "./login.module.css";
import image from "../../assets/registerbg.jpg";
import {
  loginUser,
  registerUser,
} from "../../Api/services";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { json, useNavigate } from "react-router-dom";
import { Message, disableHeader, tokenRecheck } from "../../App";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  var [errors, setError] = useState([]);
  const [paswrdEye, setPswdEyeVisible] = useState(true);
  const pswrdRef = useRef();
  const nav = useNavigate();

  const [isSuccessfull, setSuccessfull] = useState(false);

  const timerObj = useRef({ obj: 0 });

  useEffect(() => {
    disableHeader();
  }, [errors]);

  function scheduleTimer(sec, func, value) {
    if (timerObj.current.obj) window.clearTimeout(timerObj.current.obj);

    timerObj.current.obj = setTimeout(() => {
      func(value);
    }, sec);
  }

  function validateEmail(text) {
    errors = errors.filter((e) => Object.keys(e) != "email");
    setError(errors);
    if (text.length == 0) errors = [...errors, { email: "Please enter email" }];
    if (
      text.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) == null
    )
      errors = [
        ...errors,
        { email: "Please enter email in this format example@gmail.com" },
      ];
    setError(errors);
  }

  function validatePassword(text) {
    errors = errors.filter((e) => Object.keys(e) != "password");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { password: "Please enter password" }];
    if (text.length < 8 && text.length != 0)
      errors = [
        ...errors,
        { password: "Password must be atleast 8 characters" },
      ];
    setError(errors);
  }

  async function Submit(e) {
    e.preventDefault();

    validateEmail(document.getElementById("email").value);
    validatePassword(document.getElementById("password").value);

    const data = new FormData(e.currentTarget);

    const inputs = {
      email: data.get("email").toLowerCase(),
      password: data.get("password"),
    };

    if (errors.length == 0)
      loginUser(inputs)
        .then(async (res) => {
          if (res.token) {
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
           
            localStorage.setItem("token", res.token);
            localStorage.setItem("refresh_token", res.refreshToken);

            localStorage.setItem("userData", JSON.stringify(res.userData));
           
            Message("Successfully Logged In", "success");
            tokenRecheck();
            nav("/Dashboard");
          } else if (res.notAproved) {
            Message(res.notAproved, "warning");
          } else {
            Message(res.invalid, "error");
          }
        })
        .catch((err) => {
          Message("Something went wrong! Please try again later.", "error");
        });
  }

  return (
    <>
      <div className={style.registrationContainer}>
        <div className={style.BackgroundImageContainer}>
          <img className={style.RegisterImg} alt="" src={image} />
        </div>

        <div className={style.formContent}>
          <form onSubmit={Submit} className={style.FormContainer}>
            <div className={style.heading}>Login</div>
            <div className={style.headingLabel}>
              Enter your details to login your account
            </div>

            <div className={style.inputContainer}>
              <div className={style.fullInputContainer}>
                <label className={style.label} htmlFor="email">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(0, validateEmail, e.currentTarget.value)
                  }
                  onBlur={(e) => validateEmail(e.currentTarget.value)}
                />
                {errors.filter((e) => Object.keys(e)[0] == "email").length >
                0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter((e) => Object.keys(e)[0] == "email")[0]
                        .email
                    }
                  </span>
                ) : null}
              </div>
            </div>

            <div className={style.inputContainer}>
              <div className={style.fullInputContainer}>
                <label className={style.label} htmlFor="password">
                  Password *
                </label>
                {pswrdRef?.current?.value.length > 0 ? (
                  <div className={style.eyeContainer}>
                    {paswrdEye ? (
                      <AiOutlineEyeInvisible
                        onClick={(e) => setPswdEyeVisible(!paswrdEye)}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={(e) => setPswdEyeVisible(!paswrdEye)}
                      />
                    )}
                  </div>
                ) : null}

                <input
                  name="password"
                  type={paswrdEye ? "password" : "text"}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  ref={pswrdRef}
                  id="password"
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(0, validatePassword, e.currentTarget.value)
                  }
                  onBlur={(e) => validatePassword(e.currentTarget.value)}
                />

                <label
                  className={style.forgetText}
                  style={{
                    justifyContent:
                      errors.filter((e) => Object.keys(e)[0] == "password")
                        .length > 0
                        ? "space-between"
                        : "",
                  }}
                >
                  {errors.filter((e) => Object.keys(e)[0] == "password")
                    .length > 0 ? (
                    <span className={style.errorText}>
                      {
                        errors.filter((e) => Object.keys(e)[0] == "password")[0]
                          .password
                      }
                    </span>
                  ) : null}

                  <span
                    className="forget_content"
                    style={{ fontSize: "12px" }}
                    onClick={(e) => nav("/Forget")}
                  >
                    Forgot Password?
                  </span>
                </label>
              </div>
            </div>

            <button className={style.submitBtn} type="submit">
              Login
            </button>

            <div className={style.registrationText}>
              Don't have an account ?{" "}
              <span
                className={style.highlightCreate}
                onClick={(e) => nav("/Registration")}
              >
                {" "}
                Create account
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
