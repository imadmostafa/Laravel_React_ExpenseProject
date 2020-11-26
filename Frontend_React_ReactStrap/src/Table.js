import React from 'react'
import {Link, Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Router} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { Table,Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink ,NavButton, Navbar, Button} from 'reactstrap';
import Entrance_Page from './Project_Expenses/components/Entrance_Page';
import './App.css';
import './index.css';


export default function Standard() {
  
    const history = useHistory();
 
   
    const [posts, setPosts] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);


    
    if (window.performance) {
        if (performance.navigation.type == 1) {
            let token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
        } 
      }
      
        
  /*
    const fetchPosts = () => {
      axios.get('http://localhost:8000/api/getExpenses/2').then(res => {
            const result = res.data;
            console.log("RESULT: ", result);
            setPosts(res.data);
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        fetchPosts();

    }, []);


    const renderPosts = () => {

        if(!posts) {
            return (
            <tr>
                <td colSpan="4">
                    Loading Posts...
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
          <th>id</th>
          <th>Name</th>
          <th>amount</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>

     
            <tr>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.amount}</td>
                <td>{post.date}</td>
                <td>
                   
                    <button 
                    type = "button" 
                    className="btn btn-danger"
                    onClick={() => {
                       
                            alert('Failed to delete post with id :' + post.id);
                        
                    }}>
                        DELETE
                    </button>
                </td>
                
                <td>
                   
                    <button 
                    type = "button" 
                    className="btn btn-danger"
                    onClick={() => {
                       
                            alert('EDIT to delete post with id :' + post.id);
                        
                    }}>
                        EDIT
                    </button>
                </td>
            </tr>
            </tbody>
            </Table>
        ))
    }
*/
function navbar_ifNotLoggedIn(){
    return(
        <Nav >
        
       
      
        

        
        <NavItem>
        <NavLink><Link to='/login'> Login</Link></NavLink>
        </NavItem>
        <NavItem>
        <NavLink><Link to='/logout'> Logout</Link></NavLink>
        </NavItem>
      </Nav>
    )
}
// /className="bg-info clearfix"
   function navbar_ifLoggedIn(){
       return(
             
     
<div>

        <Nav >
      
         
        <NavItem >
           
            <NavLink ><Link to='/home'>Home</Link></NavLink> 
           
           

        </NavItem>
      
       
        <NavItem >
        <NavLink><Link to='/add' > Add Category</Link></NavLink>
        </NavItem>
         <NavItem>
        <NavLink><Link to='/add_Expense'> Add Expense</Link></NavLink>
        </NavItem>
        <Link to={"/show_pie"}>
   <Button>
      Show Pie
   </Button>
</Link>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle} className='ml-auto'>
          <DropdownToggle nav caret>
          Sign In/Out
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem ><Link to='/login' active>Login</Link></DropdownItem>
            <DropdownItem ><Link to='/logout' active>Logout</Link></DropdownItem>
            <DropdownItem ><Link to='/register' active>Register</Link></DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
       
      </Nav> 
      <hr></hr>
      </div>
       )
   }


if(true){
    return (
    
        <div>
     {navbar_ifLoggedIn()}
    </div>
       
    );
}else{
    return (
    
        <div>
     {navbar_ifNotLoggedIn()}
    </div>
       
    );
}
   
}
