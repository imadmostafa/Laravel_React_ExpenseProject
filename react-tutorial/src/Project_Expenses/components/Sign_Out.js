
import {  Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import React, {useState,ReactDOM} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Initial from '../Router/Main_Router';
import { Alert,Col,Card,  CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';



 export default function Sign_Out() {
    
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function makeRegisterRequest() {

        const Datato_Send = {
            
            email: email,
            password:password,
            name:username
           
          }
          if(password=='' || email=='' || username==''){
            alert('insert a valid value');
           // history.push('/login');
          }else{

         
           let res;
           let data_back='';
           try{
            res = await axios.post('http://localhost:8000/api/register', Datato_Send);
            data_back=res.data.token;
           }catch(error)
           {

            alert("Register failed Email Taken");


           }
    
       // console.log(res.data);
        if(data_back!=null){
            console.log('registered');
     
       
        history.push('/register');//this will redirect you to home page ;
        }else{
            alert("Register failed Email Taken");
        }
        
      }//end of else there is input not empty ;
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
        <CardHeader> Join Our Community !</CardHeader>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardText>
          <FormGroup>
            <Label for="examplePassword">Username</Label>
            <Input type="password" name="username" id="username" placeholder="Enter UserName" 
            value={username}
            onChange={e => setUserName(e.target.value)}
            />
          </FormGroup>
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
         
        <Button color='danger' onClick={makeRegisterRequest}>Register Now!</Button>
  
   </CardFooter>
      </Card>
      </Col>
      </Row>
    </Form>
  );
}

