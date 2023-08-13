import React, { useEffect, useRef, useState } from "react";
import style from "./forget.module.css";
import image from "../../assets/registerbg.jpg";
import { sendOtp, updatePassword } from "../../Api/services";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Message, disableHeader } from "../../App";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Forget = () => {
  var [errors, setError] = useState([]);
  const [email, setEmail] = useState("");
  const [paswrdEye, setPswdEyeVisible] = useState(true);
  const [cnfrmPaswrdEye, setCnfrmPswdEyeVisible] = useState(true);
  const pswrdRef = useRef();
  const cnfrmpwsdRef = useRef();
  const nav = useNavigate();

  const [isSuccessfull, setSuccessfull] = useState(false);
  const [isDisableForm, setDisableForm] = useState(true);
  const [isDisableOTP, setDisableOTP] = useState(false);

  const [isDisableBtn, setDisablebtn] = useState(false);

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
        { email: "Please enter Email in this format example@gmail.com" },
      ];
    setError(errors);
  }

  function validateOTP(text) {
    errors = errors.filter((e) => Object.keys(e) != "otp");
    setError(errors);
    if (text.length == 0) errors = [...errors, { otp: "Please enter OTP" }];
    if (text.length != 0 && text.length < 4)
      errors = [...errors, { otp: "OTP can not be less than 4 digits" }];
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
        { password: "Password should not be less than 8 characters" },
      ];
    setError(errors);
  }

  function validateConfirmPassword(text) {
    errors = errors.filter((e) => Object.keys(e) != "confirm_password");
    setError(errors);
    if (text.length == 0)
      errors = [
        ...errors,
        { confirm_password: "Please Confirm Your Password" },
      ];
    if (document.getElementById("password").value != text)
      errors = [
        ...errors,
        { confirm_password: "Password and Confirm Password should be same" },
      ];

    setError(errors);
  }

  async function Submit(e) {
    setDisablebtn(true);
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    validateEmail(data.get("email"));
    setEmail(data.get("email"));
    var inputs = {
      email: data.get("email"),
    };

    if (errors.length == 0)
      await sendOtp(inputs)
        .then((res) => {
          if (res.msg) {
            setDisablebtn(false);
            Message(res.msg, "success");
            setDisableForm(false);
            setDisableOTP(true);
          } else {
            setDisablebtn(false);
            Message(res.error, "error");
          }
          console.log(res);
        })
        .catch((err) => {
          setDisablebtn(false);
          Message("Something went wrong! Please try again later.", "error");
        });
    else setDisablebtn(false);
  }

  async function SubmitChange(e) {
    e.preventDefault();

    validateOTP(document.getElementById("otp").value);
    validatePassword(document.getElementById("password").value);
    validateConfirmPassword(document.getElementById("confirm_password").value);

    const data = new FormData(e.currentTarget);
    var inputs = {
      email: email,
      otp: data.get("otp"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };

    if (errors.length == 0)
      updatePassword(inputs).then(async (res) => {
        console.log(res);
        if (res.msg) {
          Message("Successfully Reset your password", "success");
          nav("/Login");
        } else {
          Message("Something went wrong", "warning");
        }
        if (res.error) {
          Message(res.error, "error");
        }
      });

    console.log(inputs);
  }

  return (
    <>
      {isSuccessfull ? (
        <Alert status="success" className={`${style.label} ${style.alert}`}>
          <AlertIcon />
          Please send email
        </Alert>
      ) : null}
      <div className={style.registrationContainer}>
        <div className={style.BackgroundImageContainer}>
          <img className={style.RegisterImg} alt="" src={image} />
        </div>

        <div className={style.formContent}>
          <form onSubmit={Submit} className={style.FormContainer}>
            <div className={style.heading}>Forgot Password?</div>
            <div className={style.headingLabel}>Enter your email</div>

            <div className={isDisableOTP ? style.disable : null}>
              <div className={style.inputContainer} >
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
                    disabled={isDisableBtn}
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

              <button
                className={style.submitBtn}
                type="submit"
                id="subitOtpBtn"
                style={
                  isDisableBtn ? { cursor: "not-allowed", opacity: ".6" } : {}
                }
                disabled={isDisableBtn}
              >
                Send OTP
              </button>
            </div>

          </form>

          <form
            onSubmit={SubmitChange}
            className={style.FormContainer}
            style={{ marginTop: "0" }}
          >
            <div className={isDisableForm ? style.disable : null}>
              <div className={style.inputContainer}>
                <div className={style.fullInputContainer}>
                  <label className={style.label} htmlFor="otp">
                    Enter OTP
                  </label>
                  <input
                    name="otp"
                    type="text"
                    id="otp"
                    className={style.inputBox}
                    onChange={(e) =>
                      scheduleTimer(0, validateOTP, e.currentTarget.value)
                    }
                    onBlur={(e) => validateOTP(e.currentTarget.value)}
                  />
                  {errors.filter((e) => Object.keys(e)[0] == "otp").length >
                    0 ? (
                    <span className={style.errorText}>
                      {errors.filter((e) => Object.keys(e)[0] == "otp")[0].otp}
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
                    ref={pswrdRef}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    id="password"
                    className={style.inputBox}
                    onChange={(e) =>
                      scheduleTimer(0, validatePassword, e.currentTarget.value)
                    }
                    onBlur={(e) => validatePassword(e.currentTarget.value)}
                  />
                  {errors.filter((e) => Object.keys(e)[0] == "password")
                    .length > 0 ? (
                    <span className={style.errorText}>
                      {
                        errors.filter((e) => Object.keys(e)[0] == "password")[0]
                          .password
                      }
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={style.inputContainer}>
                <div className={style.fullInputContainer}>
                  <label className={style.label} htmlFor="confirm_password">
                    Confirm Password *
                  </label>
                  {cnfrmpwsdRef?.current?.value.length > 0 ? (
                    <div className={style.eyeContainer}>
                      {cnfrmPaswrdEye ? (
                        <AiOutlineEyeInvisible
                          onClick={(e) =>
                            setCnfrmPswdEyeVisible(!cnfrmPaswrdEye)
                          }
                        />
                      ) : (
                        <AiOutlineEye
                          onClick={(e) =>
                            setCnfrmPswdEyeVisible(!cnfrmPaswrdEye)
                          }
                        />
                      )}
                    </div>
                  ) : null}
                  <input
                    name="confirm_password"
                    type={cnfrmPaswrdEye ? "password" : "text"}
                    ref={cnfrmpwsdRef}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    id="confirm_password"
                    className={style.inputBox}
                    onChange={(e) =>
                      scheduleTimer(
                        0,
                        validateConfirmPassword,
                        e.currentTarget.value
                      )
                    }
                    onBlur={(e) =>
                      validateConfirmPassword(e.currentTarget.value)
                    }
                  />
                  {errors.filter((e) => Object.keys(e)[0] == "confirm_password")
                    .length > 0 ? (
                    <span className={style.errorText}>
                      {
                        errors.filter(
                          (e) => Object.keys(e)[0] == "confirm_password"
                        )[0].confirm_password
                      }
                    </span>
                  ) : null}
                </div>
              </div>

              <button className={style.submitBtn} type="submit">
                Change Password
              </button>
            </div>
            <div className={style.registrationText}>
              Wanna try to login again?{" "}
              <span
                className={style.highlightCreate}
                onClick={(e) => nav("/Login")}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;
