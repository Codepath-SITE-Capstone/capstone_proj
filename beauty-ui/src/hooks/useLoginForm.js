import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../services/apiClient"
import { useAuthContext } from "../Contexts/auth"

export const useLoginForm = ()=>{
    const {user, setUser} =useAuthContext()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      email: "",
      password: "",
    })
    const [hide, show]= useState(true)

    useEffect(() => {

      if (user?.email) {
        navigate("/profile")
       
      }
    }, [user, navigate])
    
    const showPasswordBox = () =>{
      show(hide ? false : true)
}
    const handleOnChange = (event) => {
      if (event.target.name === "email") {
        if (event.target.value.indexOf("@") === -1) {
          setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
        } else {
          setErrors((e) => ({ ...e, email: null }))
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }


    const handleOnSubmit = async (event) => {
      
      setIsProcessing(true)
      
      const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password })
      if (error) setErrors((e) => ({ ...e, form: error }))
     
      if (data) {
        setUser(data.user)
        apiClient.setToken(data.token)
        localStorage.setItem("beauty_token", data.token)
      }
  
      setIsProcessing(false)
      
    }

    return { handleOnSubmit, handleOnChange, isProcessing, errors, form, showPasswordBox, hide}
}