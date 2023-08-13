import React, { useEffect, useRef, useState } from "react";
import style from "./registration.module.css";
import image from "../../assets/registerbg.jpg";
import { getDistrictList, registerUser } from "../../Api/services";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Message, disableHeader } from "../../App";
import { useNavigate } from "react-router-dom";
const fileTypes = ["JPG", "PNG", "SVG", "GIF"];

const Registration = () => {
  var [errors, setError] = useState([]);
  const pswrdRef = useRef();
  const cnfrmpwsdRef = useRef();
  const [paswrdEye, setPswdEyeVisible] = useState(true);
  const [cnfrmPaswrdEye, setCnfrmPswdEyeVisible] = useState(true);
  const [mobileNumber, setMobilePhone] = useState("");

  const [districtList, setDisctrictList] = useState([]);

  var nav = useNavigate();

  const timerObj = useRef({ obj: 0 });

  useEffect(() => {
    getDistrictData();
  }, []);

  useEffect(() => {
    disableHeader();
  }, [errors]);

  const getDistrictData = async () => {
    const response = await getDistrictList();
    if (response.districtList) {
      setDisctrictList(response.districtList);
    }
  };
  function scheduleTimer(sec, func, value) {
    if (timerObj.current.obj) window.clearTimeout(timerObj.current.obj);

    timerObj.current.obj = setTimeout(() => {
      func(value);
    }, sec);
  }

  function validateName(text) {
    errors = errors.filter((e) => Object.keys(e) != "name");
    setError(errors);
    if (text.length == 0) errors = [...errors, { name: "Please enter name" }];
    if (text.match(/\d+/g))
      errors = [...errors, { name: "Please enter only characters" }];
    setError(errors);
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

  function validatePassword(text) {
    errors = errors.filter((e) => Object.keys(e) != "password");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { password: "Please enter password" }];
    if (
      text.match(/^(?=.*\d)(?=(.*\W){1})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{1,15}$/
      ) == null
      )
      errors = [
        ...errors,
        { password: "Password must be atleast 8 characters, 1 Uppercase, 1 smallcase, Digit, 1 special character" },
      ];
    setError(errors);
  }

  function validateConfirmPassword(text) {
    errors = errors.filter((e) => Object.keys(e) != "confirm_password");
    setError(errors);
    if (text.length == 0)
      errors = [
        ...errors,
        { confirm_password: "Please confirm your password" },
      ];

    if (document.getElementById("password").value != text)
      errors = [
        ...errors,
        { confirm_password: "Password and Confirm Password should be same" },
      ];

    setError(errors);
  }

  function validateMobile(text) {
    errors = errors.filter((e) => Object.keys(e) != "mobile_number");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { mobile_number: "Please enter mobile number" }];
    if (text.length < 10)
      errors = [
        ...errors,
        { mobile_number: "Mobile number should not be less than 10 digits" },
      ];
    if (text.length > 10) {
    } else {
      setMobilePhone(text);
    }
    setError(errors);
  }

  function validateSelectedDistrict(text) {
    errors = errors.filter((e) => Object.keys(e) != "selectedDistrict");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { selectedDistrict: "Please select district" }];
    setError(errors);
  }

  function validateAddress(text) {
    errors = errors.filter((e) => Object.keys(e) != "address");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { address: "Please enter address" }];
    setError(errors);
  }

  function validateCity(text) {
    errors = errors.filter((e) => Object.keys(e) != "city");
    setError(errors);
    if (text.length == 0) errors = [...errors, { city: "Please enter city" }];
    setError(errors);
  }

  function validatePincode(text) {
    errors = errors.filter((e) => Object.keys(e) != "pin_code");
    setError(errors);
    if (text.length == 0)
      errors = [...errors, { pin_code: "Please enter pincode number" }];
    if (text.length != 6)
      errors = [...errors, { pin_code: "Pincode should 6 digits long" }];
    setError(errors);
  }

  async function Submit(e) {
    e.preventDefault();
    validateName(document.getElementById("name").value.trimEnd().trimStart());
    validateEmail(document.getElementById("email").value.trimEnd().trimStart());
    validatePassword(document.getElementById("password").value.trimStart());

    validateConfirmPassword(
      document.getElementById("confirm_password").value.trimStart()
    );
    validateMobile(
      document.getElementById("mobile_number").value.trimEnd().trimStart()
    );

    validateAddress(
      document.getElementById("address").value.trimEnd().trimStart()
    );

    validateCity(document.getElementById("city").value.trimEnd().trimStart());

    validatePincode(
      document.getElementById("pin_code").value.trimEnd().trimStart()
    );

    var userTypeInputBox = document.getElementsByName("user_type");
    var userType;
    for (var i = 0; i < userTypeInputBox.length; i++) {
      if (userTypeInputBox[i].checked) userType = userTypeInputBox[i].value;
    }

    const data = new FormData(e.currentTarget);

    const inputs = {
      name: data.get("name").trimEnd().trimStart(),
      username: data.get("email").trimEnd().trimStart().toLowerCase(),
      email: data.get("email").trimEnd().trimStart().toLowerCase(),
      password: data.get("password").trimStart(),
      confirm_password: data.get("confirm_password").trimStart(),
      mobile_number: data.get("mobile_number").trimEnd().trimStart(),
      is_vendor: userType == "vendor" ? true : false,
      is_district: userType == "district" ? true : false,
      district_id: data.get("selectedDistrict").trimEnd().trimStart(),
      address: data.get("address").trimEnd().trimStart(),
      city: data.get("city").trimEnd().trimStart(),
      pin_code: data.get("pin_code").trimEnd().trimStart(),
    };

    if (errors.length == 0) {
      var response = await registerUser(inputs);

      if (response.msg == "Registered Successfully") {
        Message("Successfully Registered!", "success");
        nav("/Login");
      }
      if (response.error) {
        Message(
          response.error.name ? response.error.name : "Something went wrong",
          "error"
        );
      }
    }
  }

  return (
    <>
      <div className={style.registrationContainer}>
        <div className={style.BackgroundImageContainer}>
          <img className={style.RegisterImg} alt="" src={image} />
        </div>

        <div className={style.formContent}>
          <form onSubmit={Submit} className={style.FormContainer}>
            <div className={style.heading}>Sign Up</div>
            <div className={style.headingLabel}>
              Enter your details to create your account
            </div>

            <div className={style.inputContainer}>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="name">
                  Name *
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateName,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateName(e.currentTarget.value.trimEnd().trimStart())
                  }
                  className={style.inputBox}
                />
                {errors.filter((e) => Object.keys(e)[0] == "name").length >
                0 ? (
                  <span className={style.errorText}>
                    {errors.filter((e) => Object.keys(e)[0] == "name")[0].name}
                  </span>
                ) : null}
              </div>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="email">
                  Email *
                </label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateEmail,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateEmail(e.currentTarget.value.trimEnd().trimStart())
                  }
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
              <div className={style.halfInputContainer}>
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
                    scheduleTimer(
                      0,
                      validatePassword,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validatePassword(
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                />
                {errors.filter((e) => Object.keys(e)[0] == "password").length >
                0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter((e) => Object.keys(e)[0] == "password")[0]
                        .password
                    }
                  </span>
                ) : null}
              </div>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="confirm_password">
                  Confirm Password *
                </label>
                {cnfrmpwsdRef?.current?.value.length > 0 ? (
                  <div className={style.eyeContainer}>
                    {cnfrmPaswrdEye ? (
                      <AiOutlineEyeInvisible
                        onClick={(e) => setCnfrmPswdEyeVisible(!cnfrmPaswrdEye)}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={(e) => setCnfrmPswdEyeVisible(!cnfrmPaswrdEye)}
                      />
                    )}
                  </div>
                ) : null}
                <input
                  name="confirm_password"
                  type={cnfrmPaswrdEye ? "password" : "text"}
                  id="confirm_password"
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  ref={cnfrmpwsdRef}
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateConfirmPassword,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateConfirmPassword(
                      e.currentTarget.value.trimEnd().trimStart()
                    )
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

            <div className={style.inputContainer}>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="mobile_number">
                  Mobile Number *
                </label>
                <input
                  name="mobile_number"
                  type="number"
                  id="mobile_number"
                  value={mobileNumber}
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateMobile,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateMobile(e.currentTarget.value.trimEnd().trimStart())
                  }
                />
                {errors.filter((e) => Object.keys(e)[0] == "mobile_number")
                  .length > 0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter(
                        (e) => Object.keys(e)[0] == "mobile_number"
                      )[0].mobile_number
                    }
                  </span>
                ) : null}
              </div>

              <div className={style.halfInputContainer}>
                <label className={style.label}>User type *</label>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "20px", display: "flex" }}>
                    <input
                      name="user_type"
                      type="radio"
                      id="vendor"
                      value="vendor"
                      className={style.radioButton}
                      // defaultChecked={true}
                    />
                    <label className={style.label} htmlFor="vendor">
                      Vendor
                    </label>
                  </div>
                  <div style={{ marginRight: "20px", display: "flex" }}>
                    <input
                      name="user_type"
                      type="radio"
                      id="district"
                      className={style.radioButton}
                      value="district"
                    />
                    <label className={style.label} htmlFor="district">
                      District
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.inputContainer}>
              <div className={style.fullInputContainer}>
                <label className={style.label} htmlFor="selectedDistrict">
                  District *
                </label>
                <select
                  name="selectedDistrict"
                  type="text"
                  id="selectedDistrict"
                  className={style.inputBox}
                >
                  <option name={""} value={""}>
                    {""}
                  </option>

                  {districtList &&
                    districtList.map((district, index) => {
                      return (
                        <option value={district.id} name={district.id}>
                          {district.name}
                        </option>
                      );
                    })}
                </select>
                {errors.filter((e) => Object.keys(e)[0] == "selectedDistrict")
                  .length > 0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter(
                        (e) => Object.keys(e)[0] == "selectedDistrict"
                      )[0].selectedDistrict
                    }
                  </span>
                ) : null}
              </div>
            </div>

            <div className={style.inputContainer}>
              <div className={style.fullInputContainer}>
                <label className={style.label} htmlFor="address">
                  Address *
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateAddress,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateAddress(e.currentTarget.value.trimEnd().trimStart())
                  }
                />
                {errors.filter((e) => Object.keys(e)[0] == "address").length >
                0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter((e) => Object.keys(e)[0] == "address")[0]
                        .address
                    }
                  </span>
                ) : null}
              </div>
            </div>

            <div className={style.inputContainer}>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="city">
                  City *
                </label>
                <input
                  name="city"
                  type="text"
                  id="city"
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validateCity,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validateCity(e.currentTarget.value.trimEnd().trimStart())
                  }
                  className={style.inputBox}
                />
                {errors.filter((e) => Object.keys(e)[0] == "city").length >
                0 ? (
                  <span className={style.errorText}>
                    {errors.filter((e) => Object.keys(e)[0] == "city")[0].city}
                  </span>
                ) : null}
              </div>
              <div className={style.halfInputContainer}>
                <label className={style.label} htmlFor="pin_code">
                  Pincode *
                </label>
                <input
                  name="pin_code"
                  type="number"
                  id="pin_code"
                  className={style.inputBox}
                  onChange={(e) =>
                    scheduleTimer(
                      0,
                      validatePincode,
                      e.currentTarget.value.trimEnd().trimStart()
                    )
                  }
                  onBlur={(e) =>
                    validatePincode(e.currentTarget.value.trimEnd().trimStart())
                  }
                />
                {errors.filter((e) => Object.keys(e)[0] == "pin_code").length >
                0 ? (
                  <span className={style.errorText}>
                    {
                      errors.filter((e) => Object.keys(e)[0] == "pin_code")[0]
                        .pin_code
                    }
                  </span>
                ) : null}
              </div>
            </div>

            <button className={style.submitBtn} type="submit">
              Sign Up
            </button>

            <div className={style.registrationText}>
              Already have an account ?{" "}
              <span
                className={style.highlightCreate}
                onClick={(e) => nav("/Login")}
              >
                {" "}
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
