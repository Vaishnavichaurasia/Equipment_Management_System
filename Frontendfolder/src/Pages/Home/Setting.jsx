import React, { useEffect } from "react";
import style from "./setting.module.css";
import Header from "../GlobalComponent/Header";

const Setting = () => {
  useEffect(() => {

    enableHeader()
  }, [])
  return (

    <div className={style.Container}>
      <h1 className={style.heading}>Setting</h1>
    </div>
  );
};

export default Setting;
