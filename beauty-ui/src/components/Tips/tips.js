import "./tips.css"
import { Container, makeStyles, Paper, Grid, Avatar, Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(3),
          },
        justifyContent:'space-evenly',

      
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        border: '3px',
        borderColor: '#CBF3F0',
        borderStyle: 'solid',
    },
    paper: {
      margin: theme.spacing(1, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#CBF3F0',
    },
    button:{
        background:"#ffffff",
        // paddingLeft:'34%',
        // paddingBottom: '34%',
        fontFamily:'Arima Madurai',
        
    },
    paper2:{
        margin: theme.spacing(1, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
      

    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function Tips(){
    const classes = useStyles();
    
    return(
        <div className="Tips">
            <Container maxWidth="lg" style={{ backgroundColor: '#ffffff',height: '100vh' }}>
               
                <div className="tipsTitle">
                    <h2>Sustainability Culture</h2>
                </div>
                
                <div className="tipsDescription">
                    <p>
                        After giving, we want you to continue to contribute to the sustainability of the beauty industry. 
                        Maybe you're not interested in donating or recycling, but would like to learn how to be more
                        sustainable the next time you purchase any beauty product. Either way, here are some ways to do so...
                    </p>
                </div>

                <Grid container  spacing={2} className="tipsArea">
                   
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h4>Learn Some Beauty Sustainability Tips:</h4>
                            <ul className= "list">
                                <li>
                                    Recycle or re-use your product containers ~ upcycling used skincare containers 
                                    is a great way of making pretty packaging by turning it into something new and useful. 
                                    For example, you can make a large face cream pot into a new makeup brush holder!
                                </li>
                                   
                                <li>
                                    Shop from brands that give back to planet earth ~ One favourite of ours is KORRES, 
                                    who contribute towards the replacement of illegally cut trees while cooperating with the 
                                    local authorities on an effective protection plan.
                                </li>

                                <li>
                                    Reduce your water usage ~ When washing your face, turn off the water tap when you don’t 
                                    need it. It’s a super simple thing to do but it makes a big difference to water wastage.
                                </li>
                             </ul>
                            
                             <Button className={classes.button} variant="outlined" >
                                <a href="https://www.hellomagazine.com/healthandbeauty/skincare-and-fragrances/2020042087964/how-to-have-a-sustainable-skincare-routine-tips/">
                                    Read More
                                </a>
                            </Button>
                        </Paper>
                    </Grid>
                    
                    
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                           
                            <h4>Brands That Promote Beauty Sustainability:</h4>
                           
                           <Grid container className={classes.root}>
                               <a href="https://www.lushusa.com/">
                                    <Avatar  className={classes.large} variant="circular" alt="Lush" src="https://assets.simon.com/tenantlogos/22109.png"/>
                               </a>
                               
                               <a href="https://fekkai.com/">
                                    <Avatar className={classes.large} variant="circular" alt="Fekkai" src="https://pbs.twimg.com/profile_images/1214672191696130054/NEORojF8_400x400.jpg"/>
                               </a>
                              
                               
                               <a href="https://www.burtsbees.com/">
                                    <Avatar className={classes.large} variant="circular" alt="BurtsBees" src="https://scitechdaily.com/images/Burts-Bees-Logo.jpg"/>
                               </a>
                              
                               <a href="https://iliabeauty.com/">
                                    <Avatar className={classes.large} variant="circular" alt="Ilia" src="data:image/jpeg;base64,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"/>
                               </a>
                               
                               <a href="https://www.korres.com/">
                                    <Avatar className={classes.large} variant="circular" alt="CocoKind" src="https://www.birchbox.com/shop/media/catalog/category/Korres_Logo_168x200_1.png"/>
                               </a>
                               
                               <a href="https://www.lovebeautyandplanet.com/us/en/home.html">
                                    <Avatar className={classes.large} variant="circular" alt="LoveBeautyPlanet" src="https://cdn.influenster.com/media/brand/image/love_beauty_and_planet.jpeg"/>
                               </a>
                           
                           </Grid>
                            
                        </Paper>


                    </Grid>



                </Grid>

            </Container>
        </div>
    );
    
    
    }