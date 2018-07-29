import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from  "../containers/Login";
import Home  from "../containers/Home";
import NewContact from "../containers/NewContact";
import UpdateContact from "../containers/UpdateContact";
import Audit from "../containers/Audit";
import AddNew from "../containers/AddNew"
const Routes = ()=>(
    <BrowserRouter>
      <switch>
          <Route exact path="/"  component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/newContact" component={NewContact}/>
          <Route path="/updateContact" component={UpdateContact}/>
          <Route path="/Audit" component = {Audit}/>
          <Route path="/addNew" component ={AddNew}/>
      </switch>
    </BrowserRouter>
);
export default Routes;