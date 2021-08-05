import "./Profile.css"
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { Button, withStyles, Card } from "@material-ui/core"
import { useNavigate } from "react-router"
import SimpleModal from "./Popup"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import apiClient from "../../services/apiClient"

export default function Profile({user, logoutUser, donateNumber, recycleNumber, setDonateNumber, setRecycleNumber, fetchDonations, fetchRecycles, ProfileApp}) {
    // setDonateNumber(donateNumber)
    // setRecycleNumber(recycleNumber)

       //Rendering Number of donations and Number of Recycles
      
    //    useEffect(() => {
        
    //     const ProfileApp = async () => {
    //         const { data } = await apiClient.fetchNumberDonationsRecycled()

    //         if (data)  {
    //         setRecycleNumber(data.recycleNumber)
           
    //        setDonateNumber(data.donationNumber)
    //        }
             

    //     }
    //   ProfileApp()
    //     }, [setRecycleNumber, setDonateNumber])

    useEffect(() => {

        // setDonateNumber()
        // setRecycleNumber()
        ProfileApp()
        fetchDonations()
        fetchRecycles()

        
    }, [])


    console.log(user.profile_pic)
    const navigate = useNavigate()
   
    const StyledButton = withStyles({
            root:{
                borderRadius:1,
                border: '1px solid black',
            },
        })(Button);

    const handleOnLogout = async ()=>{
        await logoutUser()
        navigate("/")
    }
    const handleOnClick =  () =>{
        navigate("/profile/settings")
    }
    const goToDonations = ()=>{
        navigate("/profile/donations")
    }
    const goToRecycled = ()=>{
        navigate("/profile/recycles")
    }

    return (
        <div className= "profile">
            <div className="info">
                <div className="avatar">
                    {user.profile_pic?(
                        <Avatar src={user.profile_pic} style={{ height: '150px', width: '150px' }}></Avatar>
                        ):(
                    <Avatar style={{ height: '150px', width: '150px' }} src="/broken-image.jpg"></Avatar>)
                        }
                </div>
               
                <div className="user-info">
                   
                <h2 className="text"> <div className="settings"> Username: <br/>{user.username}</div>
                <div className="settings">Email: {user.email}</div>
                Zip Code:<br/> {user.zip_code}
                </h2>
                        {!user.profile_pic?(<div >
                            <div className="settings">
                            <StyledButton  variant="outlined" onClick={handleOnClick}>Settings</StyledButton>
                            </div>
                            <div className="settings">
                            <SimpleModal /> </div>
                            <div className="settings">
                            <StyledButton  variant="outlined" onClick={handleOnLogout}>Log Out</StyledButton></div></div>
                        ) :(<><StyledButton  variant="outlined" onClick={handleOnClick}>Settings</StyledButton>
                       
                        <StyledButton  variant="outlined" onClick={handleOnLogout}>Log Out</StyledButton></>)}
                </div>
            </div>
           <div className="user">
            <div className="welcome">
                <h1 className="welcome">Welcome, {user.first_name}!</h1>
            </div>
                <div className="products">
                <div className="donations">
                    <div className="points">
                  <h2><Link to="/points">Total Products: {donateNumber + recycleNumber} </Link></h2>
                </div>
                    <Card border={1} borderColor="#2EC4B6" padding="10%">
                        <h2 className="number">{donateNumber}</h2>
                    <h2 className="text">Products Donated!</h2>
                    <div className="btns">
                    <StyledButton className="btn" variant="outlined" onClick={goToDonations}>View Products</StyledButton>
                    </div>
                    </Card>
                </div>
                <div className="recycled">
                <div className="free-products">
                    <h2><Link to="/points"> Free Products: { Math.floor((donateNumber + recycleNumber) /20) } </Link></h2>
                </div>
                    <Card border={1} borderColor="#2EC4B6" padding="10%">
                    <h2 className="number">{recycleNumber}</h2>
                    <h2 className="text" >Products Recycled!</h2>
                    <div className="btns">
                    <StyledButton className="btn" variant="outlined" onClick={goToRecycled}>View Products</StyledButton>
                    </div>       
                    </Card>
                </div>
                </div>
            </div>
            </div>
    )
}