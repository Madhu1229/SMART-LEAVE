import './App.css';


import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { useState } from 'react';

import React from 'react'


import Start from './Pages/Start';
import Login from './Pages/Login';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import LeaveApply from './LeaveApplyInterface/LeaveApply';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>

    <div>
      <Routes>

      <Route  path="/" element={< Start/>} />
      <Route path="/Login" element={< Login />} />
      <Route path="/AboutUs" element={<AboutUs />}/>
      <Route path="/ContactUs" element={<ContactUs />}/>
      <Route path="/LeaveApply" element={<LeaveApply />}/>
      
      </Routes>
      
    </div>

 </Router>
    
  );
}

export default App;
