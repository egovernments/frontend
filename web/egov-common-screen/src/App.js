import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Cards from './components/Cards';
import Faqs from './components/Faqs';
import Message from './components/Message';
import Footer from './components/Footer';


function App() {
  return (
    
   // <Grid className="app-grid">
   // <LandingPage />
   <div>
   <Header />
   <Cards />
   <Message />
   <Faqs />
   <Footer />
 </div>

    
   // </Grid>
  );
}
export default App;