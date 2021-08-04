
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './give.css';
import React from 'react';
import { Button, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import  Grid  from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import apiClient from "../../services/apiClient";
import  IconButton  from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { InputLabel, Select, MenuItem, ListSubheader } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import Alert from '@material-ui/lab/Alert';
import { red } from "@material-ui/core/colors";




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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '10rem',
    maxHeight:'32rem',
  },

  formInputs: {
    '& .MuiTextField-root':{
      marginRight: theme.spacing(3),
     
    },
    display:'flex',
  
  },

  productType: {
     
    '& .MuiFormControl-root':{
      marginRight: theme.spacing(3),
    },
    margin: theme.spacing(1),
    minWidth: 180,
    marginTop: theme.spacing(2),
  },

formControl: {
     
    '& .MuiFormControl-root':{
      marginRight: theme.spacing(3),
    },
    marginTop: theme.spacing(2),
    minWidth: 80,
  },

submit: {
    margin: theme.spacing(3, 0, 2),
    width:'8rem',
  },

typography:{
    fontFamily: 'Arima Madurai',
   marginBottom: '10px',
},
}));




export default function Give({ user, setUser, setDonateNumber, setDonations, setRecycleNumber, setRecycles, initialized, setFreeProducts}){

    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})

    //Obehi: useEffect function used to handle logic so if user is not logged in and/or registered , display an 
    // authenticated view message, else allow them to give
    useEffect(() => {
      if (user?.email) {
        navigate("/give/")
      }
      else if(!user?.email && initialized){
        navigate("/give/giveUnauthorized")
      }
    }, [user, navigate, initialized])



    //Obehi: The give form data ~ input sections
    const [form, setForm] = useState([
      //prouct_pic isnt included we have default image of product_pic depending on what the product_type is
       { product_type:"", quantity:"", is_used:"" , id: uuidv4()}, 
    ])

    console.log(form)

   
    //Obehi: Handles Default Pic rendering dependending on the product chosen to give
    const product_pic_default = {
      "Serum":'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydW18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Moisturizer": 'https://images.unsplash.com/photo-1609097164673-7cfafb51b926?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9pc3R1cml6ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Cleanser":'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5zZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Powder": 'https://images.unsplash.com/photo-1503236823255-94609f598e71?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXllc2hhZG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Mascara":'https://images.unsplash.com/photo-1560725613-4b52e67fc67b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      "Foundation": 'https://images.unsplash.com/photo-1607602132700-068258431c6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
      "Perfume": 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcmZ1bWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    }

    //Obehi: Handles Input Change
    const handleChange = (index, event) => {
      const values = [...form];
      values[index][event.target.name]=event.target.value
      setForm(values);
    };

    //Obehi: Handles click event of the add button
    const handleAddFields = () => {
      setForm([...form, {product_type: "", quantity: "", is_used: "" , id: uuidv4() }])
    }
    
    //Obehi: Handles click event of the remove button
    const handleRemoveFields = index => {
      console.log(index)
      const values = [...form];
      values.splice(index, 1);
      setForm(values);
    }
   
    //Obehi: Handles Logic after the Submission of the form
    const handleOnSubmit = async () => {
      setIsProcessing(true)
      setErrors((e) => ({ ...e, form: null }))

      form.forEach(async (x) =>{
        const{ data, error } = await apiClient.createGiving({

          product_type: x.product_type,
          quantity: x.quantity,
          is_used: x.is_used,
          product_pic: product_pic_default[x.product_type]
        
        })
       
        if(error) setErrors( setErrors((e) => ({ ...e, form: error })))

        if(data.givings.is_used=== false){
   
           setDonations(donations=>[...donations, data.givings])
           setDonateNumber(d=>{
           return  d + data.givings.quantity})
           
        }
         
        if(data.givings.is_used ===true){
         
           setRecycles(recycles=>[...recycles, data.givings])
           setRecycleNumber(r=>{
           return  r + data.givings.quantity})
   
        }

      })
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
      
              <Grid item xs={5} sm={5} md={5} className={classes.image}/>


              <Grid item xs={6} sm={6} md={6} className="giveForm" component={Paper} elevation={0}>
                <div className={classes.paper}>
                
                    {/* <Typography className={classes.typography}>Enter min:1 max:5 entries on a single submission</Typography> */}
                    <Alert variant="outlined" severity="warning" className={classes.typography}>
                         Enter 1-5 recycle/donate entries
                    </Alert>
                  
                  
                  <form  noValidate>
                    
                    { form.map((userInput, index) => (
                       <div key={userInput.id} className={classes.formInputs}>
                       
                          {/* Product Type Input Box */}
                          <FormControl className={classes.productType} variant="outlined">
                            <InputLabel htmlFor="demo-simple-select-outlined-label">Product</InputLabel>
                            <Select defaultValue="" 
                              labelId="demo-simple-select-outlined-label" 
                              label="product"
                              id="grouped-select-outlined" 
                              value={form.product_type} 
                              name="product_type" 
                              onChange={event=> handleChange(index, event)}
                              >
                              <ListSubheader>SkinCare</ListSubheader>
                                <MenuItem value={"Serum"}>Serums</MenuItem>
                                <MenuItem value={"Moisturizer"}>Moisturizers/Sun</MenuItem>
                                <MenuItem value={"Cleanser"}>Cleanser</MenuItem>
                              <ListSubheader>MakeUp</ListSubheader>
                                <MenuItem value={"Powder"}>Powders</MenuItem>
                                <MenuItem value={"Mascara"}>Mascaras</MenuItem>
                                <MenuItem value={"Foundation"}>Liquid Foundations</MenuItem>
                                <MenuItem value={"Perfume"}>Perfumes</MenuItem>
                            </Select>
                          </FormControl>
      
                          {/* Quantity Input Box */}
                          <TextField
                              className="inputSection"
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="quantity"
                              label="Quantity (min:1)"
                              type="number"
                              min="1"
                              max="100000000"
                              InputProps={{ inputProps: { min: 1, max: 100000000 } }}
                              InputLabelProps={{ shrink: true, }}
                              id="quantity"
                              autoComplete="current-quantity"
                              value={form.quantity}
                              onChange={event=> handleChange(index, event)}
                          />

                         {/* Obehi: Use Condition Input Box */}
                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Used?</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              name="is_used"
                              value={form.is_used}
                              onChange={event=> handleChange(index, event)}
                              label="Used?"
                            >
                              {/* <MenuItem value="">
                                <em>None</em>
                              </MenuItem> */}
                              <MenuItem value={"false"}>No</MenuItem>
                              <MenuItem value={"true"}>Yes</MenuItem>
                            </Select>
                          </FormControl>
                    
                        {/* Remove Button */}
                        { (form.length !== 1 ) && 
                         
                          <IconButton onClick={ () => handleRemoveFields(index) }>
                            <RemoveIcon /> 
                          </IconButton>
                        }

                          {/* Add Button */}
                          {(form.length - 1 === index && form.length !== 5) && 
                            <IconButton onClick={ () => handleAddFields() }>
                              <AddIcon  />
                            </IconButton>
                          }
                        

                    </div>

                    ))}


                  </form>
                  
                   
                  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        disabled={isProcessing} 
                        onClick={handleOnSubmit} >
                       
                        {isProcessing ? "Loading..." : "Submit"}
                        
                  </Button>

        </div>



              </Grid>
              

            </Grid>


        </Container>
      </div>
      
    );


}

