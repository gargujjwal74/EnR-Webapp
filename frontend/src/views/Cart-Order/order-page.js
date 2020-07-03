import React,{useState, useEffect} from 'react';
import axios from 'axios'; 

import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import image from "assets/img/bg7.jpg";
import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"
// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
let count =0;
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
console.log(Token);

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
    const [orders, setOrders] = useState([]);
    const [alert, setAlert]= useState([]);
    if(!Token){
      window.location.href="/login-page";
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: "https://limitless-lowlands-36879.herokuapp.com/orders/myOrder",
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
          })
      .then(res =>{
        if(res.data.status === 401){
          window.location.href="/login-page";
        }
        count = res.data.count;
        console.log(res);
        setOrders(res.data.order);
      })
      }, [])
    
     

    



  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"12vh"}} className={classNames(classes.main, classes.mainRaised)}>
            {/* <Categories/> */}
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>My Orders</b> ({count})</h4>
        <div className={classes.container}>
            {orders.map(pro =>(
                <div key= {pro._id}  style={{margin:"2vh"}} >
                 <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                        <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.product.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro.product._id} target="_blank">
                                {pro.product.name}
                            </Link>
                             <p style={{color:"black"}}>Quantity: {pro.quantity}</p>
                            <Link style={{color:"#f44336"}}to={"/Display/" + pro.productId} target="_blank">
                                INR: {pro.product.price}
                            </Link>
                          
                    </Grid>
                    
                </Grid> 
                    <hr/>
                </div>
                ))}


        </div>
      </div>
 
      <Footer/>
   
    </div>
  );
}
