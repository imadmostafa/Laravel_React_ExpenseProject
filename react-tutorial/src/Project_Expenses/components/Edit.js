import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';
import { Card,Row,Col, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,Alert } from 'reactstrap';
import { post } from 'jquery';

export default function Edit() {
    const { id } = useParams();
    
    const history = useHistory();
    const [expense_id, setExpense_Id] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [date, setDate] = useState('');
    
    const onEditSubmit = async () => {
       
        try {
         
          const datato_send = {
            
            name: name,
            category_id: category_id,
            date: date,
            amount:amount
          }
          let url_to_send="http://localhost:8000/api/editExpense/"+expense_id;
          let res = await axios.post(url_to_send, datato_send);
    
          console.log(res.data);
          
            history.push('/home');
        }catch {
            alert('Failed to Edit Post');
        } finally {
           
        }
    };

    useEffect(() => {//get the expense we want ;
      var send_url_index="http://localhost:8000/api/getExpense/"+id;
      axios.get(send_url_index).then(res => {
            const post = res.data;
            setName(post.name);
            setDate(post.date);
            setCategory_id(post.category_id);
            setAmount(post.amount);
            setExpense_Id(post.id);
    
        })
    }, []);

    return (
        
      <div>
       
      <Row className="justify-content-center ">


      <Col sm="6">
              <Card body outline color="secondary" className="text-center">
              <CardHeader><div className="form-group">
              <label>Enter New Expense Name</label>
              <textarea 
              
              required
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              ></textarea>
          </div></CardHeader>
              <CardBody>
                <CardTitle tag="h5"> <div className="form-group">
              <label>Enter amount in $ :P</label>
              <textarea 
              required
              className="form-control"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              ></textarea>
          </div></CardTitle>
                <CardText>  
          <div className="form-group">
              <label>Enter  Category ID</label>
              <textarea 
              required
              className="form-control"
              value={category_id}
              onChange={e => setCategory_id(e.target.value)}
              ></textarea>
          </div></CardText>
         
              </CardBody>
              <CardFooter> 
             
          <div className="form-group">
              <label>Enter Date</label>
              <textarea 
              required
              className="form-control"
              value={date}
              onChange={e => setDate(e.target.value)}
              ></textarea>
          </div>
          <div className="form-group">
              <Button
              type="button"
              className="btn btn-success"
              onClick={onEditSubmit}>
                  Edit Expense
               
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
