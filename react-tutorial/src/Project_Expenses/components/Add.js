import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Button,Card,Row,Col, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,Alert } from 'reactstrap';
import  { Redirect } from 'react-router-dom'



export default function Add() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [category_name, setTitle] = useState('');
    const [description, setDescription] = useState('');

    var isloggedin=localStorage.getItem('isloggedin');
    if(isloggedin!="true"){
        history.push('/login');
        
       
      }
    async function makePostRequest() {

        const Datato_Send = {
            
            name: description,
           
          }
          let res;
          let data_back='';
          try{
            let token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
            res = await axios.post
           ('http://localhost:8000/api/addCategroy', Datato_Send);
           data_back=res.data.data;
           console.log(data_back);
          }catch(error){
              history.push('/add');//re render user for add category page itself;
          alert('name exists');
         
          }
       

       
        if(data_back=='Post created!'){
        alert('category added');
        console.log(res.data);
        history.push('/home');//this will redirect you to home page ;
        }
        else{
            alert('erj3 jarreb hbb');
        }
       
    }
    
    return (
        <div>

    
        <Row className="justify-content-center ">


        <Col sm="6">
                <Card body outline color="secondary" className="text-center">
                <CardHeader></CardHeader>
                <CardBody>
                  <CardTitle tag="h5"></CardTitle>
                  <CardText> <div className="form-group">
                <label>Enter New Category Name</label>
                <textarea 
                required
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div></CardText>
           
                </CardBody>
                <CardFooter> 
                <div className="form-group">
                <Button
                type="button"
                className="btn btn-success"
                onClick={makePostRequest}>
                    Add Category
                 
                </Button>
            </div>
         
           </CardFooter>
              </Card>
              </Col>
              </Row>
        <form>
            
           
           
        </form>
        </div>
    );
};
