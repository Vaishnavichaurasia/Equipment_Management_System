import React, { useState, useEffect } from 'react'
import style from "./dashboard.module.css"
import { enableHeader } from '../../App'

const Dashboard = () => {
  useEffect(() => {
    enableHeader()
  }, [])


  return (
    
    <div className={style.Container}>
      
      <div className={style.ordCreateContainer}>
        <button className={style.orderCreateBtn} onClick={e => {
        }}>
          Dashboard
        </button>
      </div>


    </div>
  )
}

export default Dashboard