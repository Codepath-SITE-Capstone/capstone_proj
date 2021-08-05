import { Grid, Card, Container, CardMedia, CardContent, makeStyles, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '20vw',
        height: '40vh',
        border:'2px solid',
        borderRadius: 0,
        borderColor:'#2EC4B6',
     
    },
    title: {
     paddingTop: '5%',
     paddingBottom: '5%',
     alignItems:'center',
     justifyContent:'space-between',
    },

    viewRecycledTitle:{
        padding:"0",
    },

    Button:{
        justifyContent:'flex-end',
    },
    feed: {
     justifyContent:"flex-start",
     alignContent:"space-evenly",
     gridRowGap:'4rem' ,
     gridColumnGap: '2rem',


    },
    card: {
        borderColor:"primary.main"
    },
    media: {
      height: '7%',
      width: '100%',
      paddingTop: '56.25%', 
    },
    content:{
        padding:"8px 7px 15px",
    },
  }));

  export default function UserRecycles({ recycles, fetchRecycles, recycleNumber,  ProfileApp }){
    const navigate = useNavigate()
    const handleOnClick =  () =>{
        navigate("/profile/donations")
    }

    
    useEffect(() => {
        ProfileApp()
        fetchRecycles()
        
    }, [])


    const classes = useStyles();
  
    return(
        <div className="Recycles">
             <Container maxWidth="lg" style={{ backgroundColor: '#ffffff',height: '100vh' }}>
                <Grid container className="usersRecycles">
                   
                    <Grid container className={classes.title} >
                        <h2 className={classes.viewRecycledTitle}>Total Recycled Products: {recycleNumber}</h2>
                        <Button className={classes.Button} onClick={handleOnClick} variant="outlined" size="small">
                            View Donated
                        </Button>
                        
                    </Grid>
                    
                    <Grid container className={classes.feed}>
                        {recycles.map((recycle) => {
                            return ( 
                                <Card className={classes.root} key={recycle.id} >
                                        
                                        <CardMedia 
                                        className={classes.media}
                                        image={recycle.product_pic}
                                        title="Recycle"
                                        />
                                        
                                        <CardContent className={classes.content}>
                                            <Typography variant="body1" color="textSecondary" component="p">
                                               Product: {recycle.product_type} 
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary" component="p">
                                               Qty: {recycle.quantity}
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary" component="p" className={classes.timestamp}>
                                               Created: { moment(recycle.created_at).fromNow() }
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