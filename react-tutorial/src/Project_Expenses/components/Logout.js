import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
export default function Logout(){


    const history = useHistory();



    localStorage.clear();
    history.push('/login');
   
return(
    <Redirect to='/login'></Redirect>
)






}

















