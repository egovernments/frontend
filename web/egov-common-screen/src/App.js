import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Cards from './components/Cards';
import Faqs from './components/Faqs';
import Message from './components/Message';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';



function App() {
  return (
    
   // <Grid className="app-grid">
   // <LandingPage />
   <div>
   <Header />
   <Cards />
   <Message />
   <center ><p  style ={{  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "36px",
  lineHeight: "42px",
  textAlign: "center",
  color:"rgba(0, 0, 0, 0.87)"
  }}>Frequently Asked Questions</p></center >
   <Faqs />
   <center ><p  style ={{fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "36px",
  lineHeight: "42px",
  textAlign: "center",
  color:"rgba(0, 0, 0, 0.87)"}}>User Testimonials</p></center >

<Testimonials />

   <Footer />
 </div>

    
   // </Grid>
  );
}
export default App;