import React from 'react'
import ReactDOM from 'react-dom';
import Add from '../components/Add';
import Edit from '../components/Edit';
import Home from '../components/Home';
import Sign_In from '../components/Sign_In';
import Entrance_Page from '../components/Entrance_Page';
import Sign_Out from '../components/Sign_Out';
import GetCategories from '../components/GetCategories';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
} from 'react-router-dom';


import Standard from '../../Table';
import Add_Expense from '../components/Add_Expense';
import Logout from '../components/Logout';



export default function Initial() {
    //2 switches , one for the navbar with defaoult one as logic shown so if we are not in entrance page we
    //render the defaoult navbar ;
    return (
        
     
        <Router >

              
            
          
           
          
              
             <Standard />
             
          
           
            <Switch>
            
                <Route exact path="/home">
                   <Home></Home>
                </Route>
                <Route exact path="/add">
                    <Add></Add>
                </Route>
                <Route exact path="/login">
                    <Sign_In></Sign_In>
                </Route>   
                <Route exact path="/edit/:id">
                    <Edit></Edit>
                </Route> 
                <Route exact path="/add_Expense">
                   <Add_Expense></Add_Expense>
                </Route>  
                <Route exact path="/logout">
                   <Logout></Logout>
                </Route>
                <Route exact path="/register">
                   <Sign_Out></Sign_Out>
                </Route>   
                <Route exact path="/show_pie">
                   <GetCategories></GetCategories>
                </Route>                
            </Switch>

        </Router>
       
    )
}


