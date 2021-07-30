
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './give.css';
import React from 'react';
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import  Grid  from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import apiClient from "../../services/apiClient";

// import { WithStyles } from "@material-ui/core";

//Styles:CSS using Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: theme.spacing(5),
    height:'25rem',
  },
  paper: {
    margin: theme.spacing(1, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'25rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    margin: theme.spacing(0, "auto"),
    height:'25rem',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 34,
    height: 17,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 4,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 11,
    height: 12,
    boxShadow: 'none',
    color: theme.palette.common.black
  },
  track: {
    border: `2px solid ${theme.palette.grey[500]}`,
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);



export default function Give({ user, setUser, setDonateNumber, setDonations, setRecycleNumber, setRecycles, initialized, setFreeProducts}){

    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
   // const [createdAt, setCreatedAt] = useState("")
    const [toggle, setToggle]=useState(false)
    

    const [form, setForm] = useState({
        product_type:"",
        quantity:"",
        is_used:toggle,
        zip_code:"",
        product_pic:"",
    })

    useEffect(() => {
      // if user is already logged in,
      // redirect them to the detailed activity page aka an authenticated view
      if (user?.email) {
        navigate("/give/")
      }
      else if(!user?.email && initialized){
        
        navigate("/give/giveUnauthorized")
      }
    }, [user, navigate, initialized])

   
    //Obehi: Handles inputting in the form
      const handleOnInputChange = (event) => {
          setForm((f) => ({ ...f, [event.target.name]: event.target.value }))  
      }
      
      //Obehi: Handles Toggle Button Data
      const toggler = () => {
        toggle ? setToggle(false): setToggle(true)
      
      }

    //Obehi: handles change of Toggle button
     const handleChange = (event) => {
      setForm((f) => ({ ...f, [event.target.name]: event.target.checked }))
    };

   
   
   
    const handleOnSubmit = async () => {
      setIsProcessing(true)
      setErrors((e) => ({ ...e, form: null }))
      
      const{ data, error } = await apiClient.createGiving({
            product_type: form.product_type,
            quantity: form.quantity,
            is_used: form.is_used,
            zip_code: form.zip_code,
            product_pic: form.product_pic
      })
      setFreeProducts(data.givings.quantity)
      if(error) setErrors( setErrors((e) => ({ ...e, form: error })))
      
      
      if(data.givings.is_used=== false){
       // console.log(data)

        setDonations(donations=>[...donations, data.givings])
        setDonateNumber(d=>{
        
          // console.log(d)
          // console.log(data)
          // console.log(form.quantity)
        return  d + data.givings.quantity})
        
      }

      console.log(data.givings.is_used)
      if(data.givings.is_used ===true){
      
        setRecycles(recycles=>[...recycles, data.givings])
        setRecycleNumber(r=>{
          // console.log(d)
          // console.log(data)
          // console.log(form.quantity)
        return  r + data.givings.quantity})

      }
      setIsProcessing(false)

    navigate("/give/giveSuccess")
    
    }
    
 
  const classes = useStyles();
  
    
    return(
      <div className="Give">
        <Container maxWidth="lg" style={{ backgroundColor: '#ffffff',height: '100vh' }} justify-content="center">
           <div className="giveTitle">
                 <h2>GIVE</h2>
           </div>
           <div className="giveDescription">
                <p>
                    Empty, gently used, or never opened,  Hīrā will find the mose sustainable and eco-friendly way 
                    to get rid of your unwanted products. 
                </p>
            </div>
            
            <Grid container  spacing={1} className="feedArea">
      
              <Grid item xs={3} sm={3} md={4} className={classes.image}>
                {/* <img className="givePicture"  src = "https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Makeup"></img> */}

              </Grid>

              <Grid item xs={3} sm={3} md={4} className="giveForm" component={Paper} elevation={0}>
              <div className={classes.paper}>
          {/* <Typography component="h3" variant="h3" fontFamily="Arima Madurai">
            Give
          </Typography> */}
          
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="productType"
              label="Product Type"
              name="product_type"
              autoComplete="product_type"
              autoFocus
              value={form.product_type}
              onChange={handleOnInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Quantity"
              type="quantity"
              id="quantity"
              autoComplete="current-quantity"
              value={form.quantity}
              onChange={handleOnInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="product_pic"
              label="Product Image"
              type="productImg"
              id="productImg"
              autoComplete="product-image"
              value={form.product_pic}
              onChange={handleOnInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="zip_code"
              label="Zip Code"
              type="zipCode"
              id="zipCode"
              autoComplete="zip-code"
              value={form.zip_code}
              onChange={handleOnInputChange}
            />

            <FormControl>
              
                <Grid container component="label"  alignItems="center" spacing={1}>
                  <Grid item>No</Grid>
                  <Grid item>
                    <FormControlLabel
                    control={<AntSwitch  onChange={handleChange} name="is_used" onClick={toggler} value={form.is_used}/> }
                    
                    label="Used"
                    labelPlacement="top"
                    /> 
                    {/* {toggle ? <span>True</span> : <span>False</span>} */}
                  </Grid>
                  <Grid item >Yes</Grid>
                </Grid>
            </FormControl>    
      
            <Button
              type="submit"
             fullWidth
            
              variant="contained"
              // color="#ffffff"
              className={classes.submit}
              disabled={isProcessing} 
              onClick={handleOnSubmit}
              
            >
              {isProcessing ? "Loading..." : "Submit"}
              {/* Submit */}
            </Button>
            <Grid container>
            </Grid>
  
          </form>
        </div>



              </Grid>
              

            </Grid>


        </Container>
      </div>
      
    );


}

