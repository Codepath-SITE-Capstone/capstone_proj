import "./Points.css"
import { Box, Button, withStyles, Grid } from "@material-ui/core"
// import { black } from "colors"
import { PieChart } from 'react-minimal-pie-chart'

export default function Points({donateNumber, recycleNumber, setDonateNumber, setRecycleNumber, freeProducts, setFreeProducts}) {
    setDonateNumber(donateNumber)
    setRecycleNumber(recycleNumber)
    const StyledButton = withStyles({
        root:{
            borderRadius:1,
            borderColor:'black',
        },
    })(Button);
    const handlePoints = () =>{
        //change state to be null
        setFreeProducts(0)
    }

    return (
        <div>
            <div  className="text">
            <h1>Points</h1>
            </div>
            <PieChart className="pie" style={{height: '180px'}}  lineWidth={30} label={({dataEntry})=> Math.round(dataEntry.percentage)+'%'} labelStyle={{
        fontSize: '25px',
        fontFamily: 'Arima Madurai',
        fill: '#000000',
      }}totalValue={20}
      
            data = {[ 
                {title: 'points', value:(donateNumber+ recycleNumber), color:'#2EC4B6'}
            ]} 
            labelPosition={0} />
            <Grid container spacing={2} className="points" direction="row" justifyContent="center">
            <Grid container spacing={2} justifyContent="center">
            <Grid item xs sm={3} className="graph">
             <Box border={1} borderColor="#2EC4B6">  <h2>Your Total Products:</h2> 
             <h2>{donateNumber + recycleNumber}</h2></Box>
            </Grid>
            <Grid item xs sm={3} className="free">
            <Box border={1} borderColor="#2EC4B6">   <h2>Free Products: </h2>
            <h2>{Math.round(freeProducts/20)}</h2> </Box>
            </Grid>
            </Grid>
            <Grid item xs={6} >
                <StyledButton className="btn" variant="outlined" onClick={handlePoints}>Redeem Your Free Products!</StyledButton>
                </Grid>
            <Grid item sm={10} className="body">
                <h2>For every 20 products you donate or recycle you get a free product on us! Your points are calculated by adding up the number of products you have donated and recycled.
                </h2>
            </Grid>
            </Grid>
         
            </div>
    )
}