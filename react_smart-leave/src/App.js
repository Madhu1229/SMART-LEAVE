import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import React from 'react'


import Start from './Pages/Start';
import Login from './Pages/Login';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import LeaveApply from './LeaveApplyInterface/LeaveApply';
import LeaveProfile from './LeaveApplyInterface/LeaveProfile';
import LeaveStatus from './LeaveApplyInterface/LeaveStatus';
import Notices from './Pages/Notices';
import NavBar from './Pages/NavBar';
import Footer from './Pages/Footer';
import DashBoard from './AdminInterface/DashBoard';
import ViewMembers from './AdminInterface/ViewMembers';
import NewMember from './AdminInterface/NewMember';
import LeaveApplicant from './AdminInterface/LeaveApplicant';
import ViewLeaveApplicant2 from './AdminInterface/ViewLeaveApplicant2';
import ViewLeaveApplicant3 from './AdminInterface/ViewLeaveApplicant3';
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
      <Route path="/LeaveProfile" element={<LeaveProfile />}/>
      <Route path="/LeaveStatus" element={<LeaveStatus />}/>
      <Route path="/Notices" element={<Notices />}/>
      <Route path="/NavBar" element={<NavBar />}/>
      <Route path="/Footer" element={<Footer />}/>
      <Route path="/DashBoard" element={<DashBoard />}/>
      <Route path="/ViewMembers" element={<ViewMembers />}/>
      
      <Route path="/NewMember" element={<NewMember />}/>
      <Route path="/LeaveApplicant" element={<LeaveApplicant />}/>
      <Route path="/ViewLeaveApplicant2" element={<ViewLeaveApplicant2 />}/>
      <Route path="/ViewLeaveApplicant3" element={<ViewLeaveApplicant3 />}/>

      </Routes>
      
    </div>

 </Router>
    
  );
}

export default App;
