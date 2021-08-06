import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children })=>{
    const [user, setUser]= useState({})
    const [initialized, setInitialized] = useState(false)
    const [donations, setDonations] = useState([])
    const [recycles, setRecycles] = useState([])
    const [error, setError] = useState(null)
    const [donateNumber, setDonateNumber] = useState(0)
    const [recycleNumber, setRecycleNumber]= useState(0)
    const [picture, setPicture] = useState(null)
    const [points, setPoints] = useState(0)
    const authValue = { user, setUser, initialized, setInitialized, donations, setDonations, recycles, setRecycles, error, setError, donateNumber, setDonateNumber, recycleNumber, setRecycleNumber, picture, setPicture, points, setPoints }


    return (
        <AuthContext.Provider value={authValue}>
        <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext =()=> useContext(AuthContext)