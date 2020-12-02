import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card,Row,Col, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,Alert } from 'reactstrap';
    import {  Label,Input,Popover, PopoverHeader, PopoverBody } from 'reactstrap';
 
        import Calendar from "react-calendar";


export default function Add_Expense() {
  
    const history = useHistory();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category_id, setCategory_id] = useState('1');
    const [date_formatted, setDate_formatted] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const [date, setDate] = useState(new Date());

    const [category_name, setCategroy_Name] = useState('');
    const [categories_json, setCategories] = useState([{}]);
    


    var isloggedin=localStorage.getItem('isloggedin');
    if(isloggedin!="true"){
        history.push('/login');
        
       
      }
      const onChange = date => {
        //(locale, date) => formatDate(date, 'dd MMM YYYY')
       setDate(date);
     };

      function convertDate(d){
         var input_date=""+d;
         var parts = input_date.split(" ");
         var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};
         var date_formatted_mysql=""+parts[3]+"-"+months[parts[1]]+"-"+parts[2];
         console.log(date_formatted_mysql);
       //  return parts[3]+"-"+months[parts[1]]+"-"+parts[2];
       return date_formatted_mysql;
        }

        useEffect(() => {
            fetchCategories();
           
        
        }, []);







      
var categories =[{}];
        const fetchCategories = () => {
          
                var send_url_index="http://localhost:8000/api/getCategories";
                axios.get(send_url_index).then(res => {
                     // categories = res.data;
                     console.log(categories);
                      setCategories(res.data);
                  }).catch(error => console.log(error));
              }
            






    async function makePostRequest() {

        const datato_send = {
            user_id: localStorage.getItem('user_id'),
            name: name,
            category_id: category_id,
            date: convertDate(date),
            amount:amount
          }
    
        let res = await axios.post('http://localhost:8000/api/addExpense', datato_send);
    
        console.log(res.data);
        if(res.data.data=='Post created!'){
        alert('expense added');
        history.push('/home');
        }
        else{
            alert('erj3 jarreb hbb');
        }
    }


//list categories as select
    var dd =[
        {y: '79', label: "Google"},
    {y: '8', label: "Bing"},
    {y: '7', label: "Baidu"}
    ];

     
    
    
    const handleInput = event => {
        var temp=event.target.value;
        setCategroy_Name(event.target.value);
      console.log(event.target.value);
      var value = categories_json.filter(function(item) {
        return item.name == temp
      })
      //Object.values(listItems[0]).forEach(val => console.log(val));
      
      console.log("slectedvalue is",value[0].id);
      setCategory_id(value[0].id);
    };



//end of list categories as select functions 











    
    return (
        <div>
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Choose Date</PopoverHeader>

        <PopoverBody>
        <Calendar showWeekNumbers onChange={onChange} value={date} />
      {console.log(date)}
      {convertDate(date)}
     

            
            </PopoverBody>
      </Popover>

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


             <fromgroup>
        <Label for="exampleSelect">Choose Category</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={handleInput}>
          {


categories_json.map((pie_data1) =>(
           <option key={pie_data1.id} value={pie_data1.name}>
          {pie_data1.name}
          </option> ))

          }
          
        
         
        </Input>
      </fromgroup>
            
            </CardText>
           
                </CardBody>

                <CardFooter> 
                <Button id="Popover1" type="button">
       Show Calendar
      </Button>
      
            <div className="form-group">
 
               
                <textarea 
                required
                className="form-control"
                value={convertDate(date)}
                onChange={e => setDate_formatted(e.target.value)}
                ></textarea>
            </div>

            <div className="form-group">
                <Button
                type="button"
                className="btn btn-success"
                onClick={makePostRequest}>
                    Add Expense
                 
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
