
import React from 'react'
import {Link, Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Router} from 'react-router-dom';
import { render } from '@testing-library/react';
import { Table,Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import { Alert,Row,Col,Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
export default function Home() {
  // Declare a new state variable, which we'll call "count"
  let token = localStorage.getItem('token');
         axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
/*
         if (window.performance) {
            if (performance.navigation.type == 1) {
                let token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
            } 
          }
*/
  const [posts, setPosts] = useState(null);
  const history = useHistory();

/*
 
  if(isloggedin!=true){
      history.push('/login');
      
     
    }*/
    var isloggedin=localStorage.getItem('isloggedin');
    if(isloggedin!="true"){
        //alert('sign in first');
        
        history.push('/login');
        
       
      }

  const fetchPosts = () => {
let user_id=localStorage.getItem("user_id");
    var send_url_index="http://localhost:8000/api/getExpenses_categoryByName/"+user_id;
    axios.get(send_url_index).then(res => {
          const result = res.data;
          console.log("RESULT:from home ", result);
          setPosts(res.data);
      }).catch(error => console.log(error));
  }

  useEffect(() => {
      fetchPosts();

  }, []);


  function deleteExpense(id){
      console.log("id is ",id);
      var send_url="http://localhost:8000/api/deleteExpense/"+id;
    axios.get(send_url).then(res => {
        const result = res.data;
        console.log("RESULT:from home ", result);
        fetchPosts();
        history.push('/home');//this will redirect you to home page ;
        alert('post deleted');
    }).catch(error => console.log(error));
    
  }

  const renderPosts = () => {

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
          <Table bordered>
    <thead key={post.id}>
      <tr>
       
        <th>Name</th>
        <th>amount $$</th>
        <th>date</th>
        <th>Category_name</th>
      </tr>
    </thead>
          <tr>
            
              <td>{post.name}</td>
              <td>{post.amount}</td>
              <td>{post.date}</td>
              <td>{post.Category_name}</td>
             
              <td>
    
              
     <Button  color='danger' onClick={() => deleteExpense(post.id)}>
         Delete Expense 
     </Button>
 
              </td>
              
              <td>
              <Link to="/edit">
     <Button>
         Edit Expense 
     </Button>
 </Link>
                 
                  
              </td>
          </tr>
          </Table>
      ))
  }



  function renderExpenses_CardMode(){
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
        <CardFooter> <Button  color='danger' onClick={() => deleteExpense(post.id)}>
       Delete Expense 
   </Button>
   
   <Link to={"edit/"+post.id}>
   <Button>
       Edit Expense 
   </Button>
</Link>
   </CardFooter>
      </Card>
      </Col>
      </Row>
    <br/>
          
          
           
           
  
            
  

            
</div>
        
    ))
  }

// /{renderPosts()}

  return (
    <div>
    {renderExpenses_CardMode()}
    </div>
  );
}











