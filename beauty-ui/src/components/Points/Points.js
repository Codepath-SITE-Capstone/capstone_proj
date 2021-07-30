import "./Points.css"
import { Box, Button, withStyles } from "@material-ui/core"
//import { black } from "colors"


export default function Points({donateNumber, recycleNumber}) {
    const StyledButton = withStyles({
        root:{
            borderRadius:1,
            borderColor:'black',
        },
    })(Button);

    return (
        <div className="points">
            <br/><br/>
            <div className="header">
            <h1>Points</h1>
            </div>
            <div className="text">
            <div className="graph">
             <Box border={1} borderColor="#2EC4B6">  <h2>Your Total Points:</h2> 
             <h2>{donateNumber +recycleNumber}</h2></Box>
            </div>
            <div className="free">
            <Box border={1} borderColor="#2EC4B6">   <h2>Free Products: </h2>
            <h2>{ Math.round((donateNumber + recycleNumber)/20) }</h2> </Box>
            </div>
                <StyledButton className="btn" variant="outlined">Redeem Your Free Products!</StyledButton>
            </div>
            <div className="body">
                <h2>For every 20 products you donate or recycle you get a free product on us!</h2>
                   <h2> Your points are calculated by adding up the number of products you have donated and recycled.
                </h2>
            </div>
        </div>
    )
}