
import React from 'react'
import {Link, Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Router} from 'react-router-dom';
import { render } from '@testing-library/react';
import { Table,Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import {  Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Alert,Row,Col,Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
    import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


    import CanvasJSReact from '../../canvas.react';
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export default function GetCategories() {
    const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const [pie_data, setpie_data] = useState(null);
  // Declare a new state variable, which we'll call "count"
  let token = localStorage.getItem('token');
         axios.defaults.headers.common['Authorization'] =  'Bearer '+token;

         const [date, setDate] = useState(new Date());

         const onChange = date => {
            //(locale, date) => formatDate(date, 'dd MMM YYYY')
           setDate(date);
         };
       
         useEffect(() => {
            fetchCategories();
      
        }, []);
  const [posts, setPosts] = useState(null);
  const history = useHistory();



//
var dp2 =[{y: 79.45, name: "Google"},
{y: 7.31, name: "Bing"},
{y: 7.06, name: "Baidu"}];
var dataPoints2=pie_data;
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Category Costs Pie Chart"
    },
    data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{name}</b>: {y}",
        showInLegend: "true",
        legendText: "{name}",
        indexLabelFontSize: 16,
        indexLabel: "{name} - {y}$",
        dataPoints:pie_data
    }]
}
//





    var isloggedin=localStorage.getItem('isloggedin');
    if(isloggedin!="true"){
        //alert('sign in first');
        
        history.push('/login');
        
       
      }


//
  const fetchCategories = () => {
var send_url_index="http://localhost:8000/api/getCategories_ByAmount";
    axios.get(send_url_index).then(res => {
          const result = res.data;
          console.log("RESULT:from piedata ", result);
          setpie_data(res.data);
      }).catch(error => console.log(error));
  }

  
 //
  function renderPieChart_Data(){
    if(!posts) {
        return (
        <tr>
            <td colSpan="4">
                Loading Expenses...
            </td>
        </tr>);
    }

    if(posts.length === 0) {
        return (
        <tr>
            <td colSpan="4">
                There is no posts yet. Add one.
            </td>
        </tr>);
    }

    return posts.map((post) => (
     
    <div>
  <Row className="justify-content-center ">


<Col sm="6">
        <Card body outline color="secondary" className="text-center">
        <CardHeader>{post.name} </CardHeader>
        <CardBody>
          <CardTitle tag="h5">{post.amount}$</CardTitle>
          <CardText>Bought at {post.date}
         | {post.Category_name}
          </CardText>
         
        </CardBody>
        <CardFooter> 
   
  
   </CardFooter>
      </Card>
      </Col>
      </Row>
    <br/>
        
            
</div>
        
    ))
  }
///////////////////////////
const [namee, setName] = useState(" ");




var dd =[
    {y: '79', label: "Google"},
{y: '8', label: "Bing"},
{y: '7', label: "Baidu"}
];
  const listItems = dd.map((pie_data1) =>
    <option key={pie_data1.y} value={pie_data1.label}> {pie_data1.label}
    </option>  

);



const handleInput = event => {
    var temp=event.target.value;
  setName(event.target.value);
  console.log(event.target.value);
  var value = dd.filter(function(item) {
    return item.label == temp
  })
  //Object.values(listItems[0]).forEach(val => console.log(val));
  console.log("slectedvalue is",value[0].y);
};

//
  return (
    <div>
        <br>
        </br>
        <br>
        </br><br>
        </br>
     
      <CanvasJSChart options = {options} />
		
     
      <fromgroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={handleInput}>
          {


   dd.map((pie_data1) =>(
<option key={pie_data1.y} value={pie_data1.label}>
     {pie_data1.label}
</option> ))

          }
          
        
         
        </Input>
      </fromgroup>
    
     
    </div>
  );
}











