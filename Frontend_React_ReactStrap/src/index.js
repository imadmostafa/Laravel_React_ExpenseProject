import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Table';
import './Project_Expenses/Router/Main_Router';
import Initial from './Project_Expenses/Router/Main_Router';

ReactDOM.render(<Initial />,document.getElementById('root'));

/*
ReactDOM.render(
(<BrowserRouter>
<Home/>
</BrowserRouter>)
,document.getElementById('root'));
*/