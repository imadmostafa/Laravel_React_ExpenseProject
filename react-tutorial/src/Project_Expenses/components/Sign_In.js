
import {  Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import React, {useState,ReactDOM} from 'react';
import {useHistory,Link} from 'react-router-dom';
import Initial from '../Router/Main_Router';
import { Alert,Col,Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';



const Sign_in = (props) => {
    
    const history = useHistory();
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function makePostRequest() {

        const Datato_Send = {
            
            email: email,
            password:password
           
          }
         if(password=='' || email==''){
           alert('insert a valid value');
          // history.push('/login');
         }
        let res = await axios.post('http://localhost:8000/api/login', Datato_Send);
    
        console.log(res.data);
        if(res.data.access_token!=null){
            console.log('logedin');
        localStorage.setItem('isloggedin',true);
        localStorage.setItem('user_id',res.data.user.id);
        localStorage.setItem('user_name',res.data.user.name);
        localStorage.setItem('token',res.data.access_token);
        console.log('user_id',res.data.message);
       
        history.push('/home');//this will redirect you to home page ;
        }else{
            alert("login failed");
        }
        
        
       
    }

  return (
    <Form>
<br>
</br>
<br>
</br>
<Row className="justify-content-center ">


<Col sm="6">
        <Card body outline color="secondary"  color='dark'>
        <CardHeader> Sign In using Email</CardHeader>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardText>
           <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          </CardText>
         
        </CardBody>
        <CardFooter>  
            <Button onClick={makePostRequest}>Sign in</Button>
        <br></br>
        <h5>Not A User ? Register</h5>
        <Link to='/register'>
   <Button color='warning'>
     Register
   </Button>
</Link>
   
  
   </CardFooter>
      </Card>
      </Col>
      </Row>



     
    </Form>
  );
}

export default Sign_in;