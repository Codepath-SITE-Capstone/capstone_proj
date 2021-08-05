import "./Points.css"
import { Box, Button, withStyles, Grid, Card, makeStyles } from "@material-ui/core"
// import { black } from "colors"
import { PieChart } from 'react-minimal-pie-chart'

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
export default function Points({donateNumber, recycleNumber, setDonateNumber, setRecycleNumber, points, setPoints}) {
   console.log(points)
    const StyledButton = withStyles({
        root:{
            borderRadius:1,
            borderColor:'black',
        },
    })(Button);
    const handlePoints = () =>{
        //change state to be null
        setPoints(0)
    }
    const classes = useStyles()
    return (
        <div>
            <div  className="text">
            <h1 className="header">Points</h1>
            </div>
            <PieChart className="pie" style={{height: '180px'}}  lineWidth={30} label={({dataEntry})=> Math.round(dataEntry.percentage)+'%'} labelStyle={{
        fontSize: '20px',
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
             <Card className={classes.root}>  <h2 className="text">Your Total Products:</h2> 
             <h2 className="text">{points[0]}</h2></Card>
            </Grid>
            <Grid item xs sm={3} className="free">
            <Card className={classes.root}>   <h2 className="text">Free Products: </h2>
            <h2 className="text">{Math.round(points/20)}</h2> </Card>
            </Grid>
            </Grid>
            <Grid item xs={6} >
                <StyledButton className="btn" variant="outlined" onClick={handlePoints}>Redeem Your Free Products!</StyledButton>
                </Grid>
            <Grid item sm={10} className="body">
                <h2 className="text">For every 20 products you donate or recycle you get a free product on us! Your points are calculated by adding up the number of products you have donated and recycled.
                </h2>
            </Grid>
            </Grid>
         
            </div>
    )
}