import "./Points.css"
import { Button, withStyles, Grid, Card, makeStyles, Modal, Backdrop, Fade } from "@material-ui/core"
// import { black } from "colors"
import { PieChart } from 'react-minimal-pie-chart'
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '17vw',
        height: 'fit-content',
        border:'2px solid',
        borderRadius: 0,
        borderColor:'#2EC4B6',
        
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #2EC4B6',
        borderColor:'#2EC4B6',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));
export default function Points({ points, pointsData}) {
    const StyledButton = withStyles({
        root:{
            borderRadius:1,
            borderColor:'black',
        },
    })(Button);

    const [open, setOpen] = useState(false);

    const handlePoints = async () =>{
        //change state to be null
        setOpen(true);
        await apiClient.redeemPoints()
        console.log("redeemed")
    }
    useEffect(()=>{
       pointsData()
      // console.log(points)
    },[])
  
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload()
    };

    
    
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
                {title: 'points', value:points, color:'#2EC4B6'}
            ]} 
            labelPosition={0} />
            <Grid container spacing={2} className="points" direction="row" justifyContent="center">
            <Grid container spacing={2} justifyContent="center">
            <div className="cards">
             <Card className={classes.root}>  <h2 className="text">Your Total Products:</h2> 
             <h2 className="text">{points}</h2></Card>
             </div>
           <div className="cards">
            <Card className={classes.root}>   <h2 className="text">Free Products: </h2>
            <h2 className="text">{Math.floor(Number(points)/20)}</h2> </Card>
            </div>
            </Grid>
            <Grid item xs={6} >
                {(Math.floor(Number(points)/20) !==0)?(
                <StyledButton className="btn" variant="outlined" onClick={handlePoints}>Redeem Your Free Products!</StyledButton>
                 ):(<></>)
                }</Grid>
                      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Thank you for redeeming your points!</h2>
            <p id="transition-modal-description">Please go to the nearest Hīrā Dropoff Center to get your free product!</p>
          </div>
        </Fade>
      </Modal>
            <Grid item sm={10} className="body">
                <h2 className="text">For every 20 products you donate or recycle you get a free product on us! Your points are calculated by adding up the number of products you have donated and recycled.
                </h2>
            </Grid>
            </Grid>
            </div>
    )
}