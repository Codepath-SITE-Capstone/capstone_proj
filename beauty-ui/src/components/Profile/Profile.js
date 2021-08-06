import "./Profile.css"
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { Button, withStyles, Card, makeStyles } from "@material-ui/core"
import { useNavigate } from "react-router"
import SimpleModal from "./Popup"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import apiClient from "../../services/apiClient"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '15vw',
        height: 'fit-content',
        border:'2px solid',
        borderRadius: 0,
        borderColor:'#2EC4B6',
     
    },


  }));

export default function Profile({user, logoutUser, donateNumber, recycleNumber, fetchDonations, fetchRecycles, ProfileApp, points, pointsData}) {
   
    useEffect(() => {
        ProfileApp()
        fetchDonations()
        fetchRecycles()
        pointsData()
        

        
    }, [])

    const classes= useStyles()

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
                        <Avatar src={user.profile_pic} style={{ height: '140px', width: '140px' }}></Avatar>
                        ):(
                    <Avatar style={{ height: '140px', width: '140px' }} src="/broken-image.jpg"></Avatar>)
                        }
                </div>
               
                <div className="user-info">
                   
                <h2 className="text"> <div className="settings"> Username: <br/>{user.username}</div>
                <div className="settings">Email:<br/> {user.email}</div>
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
                        ) :(<><div className="settings"><StyledButton  variant="outlined" onClick={handleOnClick}>Settings</StyledButton></div>
                       
                       <div className="settings"><StyledButton  variant="outlined" onClick={handleOnLogout}>Log Out</StyledButton></div></>)}
                </div>
            </div>
           <div className="user">
            <div className="welcome">
                <h1 className="welcome">Welcome, {user.first_name}!</h1>
            </div>
                <div className="products">
                <div className="donations">
                    <div className="points">
                  <h2 className="text"><Link to="/points">Points:<br/> {points} </Link></h2>
                </div>
                    <Card className={classes.root} padding="10%">
                        <h2 className="text">{donateNumber}</h2>
                    <h2 className="text">Products Donated!</h2>
                    <div className="btns">
                    <StyledButton className="btn" variant="outlined" onClick={goToDonations}>View Products</StyledButton>
                    </div>
                    </Card>
                </div>
                <div className="recycled">
                <div className="free-products">
                    <h2 className="text"><Link to="/points"> Free Products: <br/>{ Math.floor((points) /20) } </Link></h2>
                </div>
                    <Card className={classes.root} borderColor="#2EC4B6" padding="10%">
                    <h2 className="text">{recycleNumber}</h2>
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