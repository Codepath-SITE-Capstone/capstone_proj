
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
import  IconButton  from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { InputLabel, Select, MenuItem, ListSubheader } from "@material-ui/core";

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'25rem',
  },

  formInputs: {
    '& .MuiTextField-root':{
      marginRight: theme.spacing(3),
      // minWidth:100,
     
    },
    display:'flex',
    // marginTop: theme.spacing(1),
    // height:'25rem',
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



export default function Give({ user, setUser, setDonateNumber, setDonations, setRecycleNumber, setRecycles, initialized, setPoints,points}){

    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
   // const [createdAt, setCreatedAt] = useState("")
    const [toggle, setToggle]=useState(false)
    const [used, setUsed] = useState(false)
    const [product, setProduct] = useState({})
    

    const [form, setForm] = useState([
       { product_type:"", quantity:"", is_used:""},
        //prouct_pic isnt included we have default image of product_pic depending on what the product_type is
        //product_pic:"",
    ])

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
    //  const handleChange = (event) => {
    //   setForm((f) => ({ ...f, [event.target.name]: event.target.checked }))
    // };

    const handleChange = (index,event) => {
      // setUsed(event.target.value);
      console.log(index, event.target.name)
      //setForm((f) => ({ ...f, [event.target.name]: event.target.value }))

      const values = [...form];
      values[index][event.target.name]=event.target.value
      setForm(values);
    };
  
    const handleSelect = (event) => {
      setProduct(event.target.value);
    };
   
    const product_pic_default = {
      "Serum":'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydW18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Moisturizer/Sun": 'https://images.unsplash.com/photo-1609097164673-7cfafb51b926?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9pc3R1cml6ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Cleanser":'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5zZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Powder": 'https://images.unsplash.com/photo-1503236823255-94609f598e71?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXllc2hhZG93fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      "Mascara":'https://images.unsplash.com/photo-1560725613-4b52e67fc67b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      "Liquid Foundations": 'https://images.unsplash.com/photo-1607602132700-068258431c6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
      "Perfume": 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcmZ1bWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    }

    const handleAddFields = () =>{
      setForm([...form, {product_type: "", quantity: "", is_used: ""}])
    }
    const handleRemoveFields = (index) =>{
      const values = [...form];
      values.splice(index, 1);
      setForm(values);
    }
   
    const handleOnSubmit = async () => {
      setIsProcessing(true)
      setErrors((e) => ({ ...e, form: null }))

      console.log("Form", form)


      form.forEach(async (x) =>{
        setPoints(point => [...point, Number(x.quantity)])
        console.log(points)
        const{ data, error } = await apiClient.createGiving({

          product_type: x.product_type,
          quantity: x.quantity,
          is_used: x.is_used,
          product_pic: product_pic_default[x.product_type]
        
        })
      
        if(error) setErrors( setErrors((e) => ({ ...e, form: error })))

        if(data.givings.is_used=== false){
          // console.log(data)
   
           setDonations(donations=>[...donations, data.givings])
           console.log(data.givings)
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



      }

      )
      console.log(points)
      

      
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

{/* Product Type Input */}
              <Grid item xs={6} sm={6} md={6} className="giveForm" component={Paper} elevation={0}>
                <div className={classes.paper}>
                  <form  noValidate>
                    { form.map((userInput, index) => (
                       <div key={index} className={classes.formInputs}>
                         
                       

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
                        <MenuItem value={"Moisturizer/Sun"}>Moisturizers/Sun</MenuItem>
                        <MenuItem value={"Cleanser"}>Cleanser</MenuItem>
                      <ListSubheader>MakeUp</ListSubheader>
                        <MenuItem value={"Powder"}>Powders</MenuItem>
                        <MenuItem value={"Mascara"}>Mascaras</MenuItem>
                        <MenuItem value={"Liquid Foundations"}>Liquid Foundations</MenuItem>
                        <MenuItem value={"Perfume"}>Perfumes</MenuItem>
                    </Select>
                  </FormControl>
      
      
      


{/* Quantity Input */}
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
                      
                      InputLabelProps={{
                        shrink: true,
                      }}
                      
                      id="quantity"
                      autoComplete="current-quantity"
                      value={form.quantity}
                      onChange={event=> handleChange(index, event)}
                  />


  {/* Used Input Section */}
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
                              <MenuItem value="">
            <em>None</em>
          </MenuItem>
                              <MenuItem value={"false"}>No</MenuItem>
                              <MenuItem value={"true"}>Yes</MenuItem>
                            </Select>
                    </FormControl>
                    

                    
                    <IconButton onClick={() => handleRemoveFields()}>
                      <RemoveIcon /> 
                    </IconButton>

                    <IconButton onClick={() => handleAddFields()}>
                      <AddIcon  />
                    </IconButton>

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

