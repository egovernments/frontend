import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';




function App() {
  return (
    
   <Grid className="app-grid">
    
   {/* // <LandingPage /> */}
   <div>
   <Header />
   <Testimonials />
   <center ><p  style ={{  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "36px",
  lineHeight: "42px",
  textAlign: "center",
  color:"rgba(0, 0, 0, 0.87)",
  marginLeft: "10%",
  marginRight: "10%"
  }}>Frequently Asked Questions</p></center >
   <Faqs />
   {/* <Slider /> */}
   </div>
   {/* <Cards />
   <Message /> */}
   {/* <center ><p  style ={{  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "36px",
  lineHeight: "42px",
  textAlign: "center",
  color:"rgba(0, 0, 0, 0.87)",
  marginLeft: "10%",
  marginRight: "10%"
  }}>Frequently Asked Questions</p></center >
  <div  
              style={{marginLeft: "45%",
                marginRight: "45%", marginTop: "-2%", borderBottom: "5px solid #f48952"}}>     
                </div> 
   <Faqs />
   <center ><p  style ={{fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "36px",
  lineHeight: "42px",
  textAlign: "center",
  color:"rgba(0, 0, 0, 0.87)",
  marginLeft: "10%",
    marginRight: "10%"}}>User Testimonials</p>
   </center >
   <div   */}
              {/* style={{marginLeft: "45%", marginTop: "-2%",
                marginRight: "45%", borderBottom: "5px solid #f48952"}}>     
                </div> */}
  

{/* <Testimonials /> */}

<Footer />
{/* <div style={{backgroundColor:"#ffffff"}}>
  <br />
          <center><a href="https://www.digit.org/" target="_blank"><img style ={{height:"1.4em"}}src={digitLogo}   /></a></center> <br />    
          </div>
 </div> */}

    
   </Grid>
   
  );
}
export default App;