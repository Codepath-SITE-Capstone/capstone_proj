
import { Grid, Card, Container, CardMedia, CardContent, makeStyles, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '15vw',
        height: '35vh',
        border:'2px solid',
        borderRadius: 0,
        borderColor:'#64ffda',
     
    },
    title: {
    //  display:"flex",
     paddingTop: '5%',
     paddingBottom: '5%',
     alignItems:'center',
     justifyContent:'space-between',
    },

    Button:{
        justifyContent:'flex-end',
    },
    feed: {
     justifyContent:"space-between",
     alignContent:"space-evenly",
     gridRowGap:'4rem' ,
     gridColumnGap: '2rem',


    },
    card: {
        borderColor:"primary.main"
    },
    media: {
      height: '8%',
      width: '100%',
      paddingTop: '56.25%', // 16:9
    },
    timestamp: {
        textAlign:'start',
    },
  }));

export default function UserDonations({ donations, donateNumber }){
    const navigate = useNavigate()
    const handleOnClick =  () =>{
        navigate("/profile/recycles")
    }

    const classes = useStyles();
   //console.log(donations)
    return(
        <div className="Donations">
             <Container maxWidth="lg" style={{ backgroundColor: '#ffffff',height: '100vh' }}>
                <Grid container className="usersDonations">
                   
                    <Grid container className={classes.title} >
                        <h2>Total Donated Products: {donateNumber}</h2>
                        <Button className={classes.Button} onClick={handleOnClick} variant="outlined" size="small">
                            View Recycled
                        </Button>
                        
                    </Grid>
                    
                    <Grid container className={classes.feed}>
                        {donations.map((donation) => {
                            // console.log(donation)
                        // console.log(donations[donation].product_pic) 
                            return ( 
                                <Card className={classes.root} key={donation.id} >
                                        
                                        <CardMedia 
                                        className={classes.media}
                                        image={donation.product_pic}
                                        title="Donation"
                                        />
                                        
                                        <CardContent>
                                            <Typography variant="body1" color="textSecondary" component="p">
                                               Product: {donation.product_type} 
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary" component="p">
                                               Qty: {donation.quantity}
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary" component="p" className={classes.timestamp}>
                                               Created at: {donation.created_at}
                                            </Typography>


                                        </CardContent>


                                </Card>

                            )
                        
                        })
                        }
                    </Grid>
                </Grid>
             </Container>
        </div>
    );







}