import { useState } from 'react'
import { React, createContext, useContext } from 'react'
import { useEffect } from 'react'

export const GlobalContext = createContext();

export default function Context(props) {

    var [showOfferForm,setShowOfferForm] = useState(false)
    var [disabled, setDisabled] = useState(false);
      

    return (
        <>
            <GlobalContext.Provider value={{
                showOfferForm,
                setShowOfferForm,
                disabled, setDisabled
               
            }}>
                {props.children}
            </GlobalContext.Provider>
        </>
    )
}