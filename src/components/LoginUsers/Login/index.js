import React, { useState } from 'react'; 
import { FormGroup, Label, Col, Button, Input,Row, Container, Card, Form, Alert} from 'reactstrap'; 
import "./index.css";
import imagenProductivity from "./imageProductivity.jpeg";
import Navbar from '../Base/navbar';
import axios from "axios";  
import { Link } from 'react-router-dom';


const LoginUsers = (props) => {
    let bandera;
    bandera = false;

    const [email, setEmail] = useState("");
    //const [stateButton, setStateButton] = useState(false);

    const handleInputChange = (event) => {
        setEmail(event.target.value)
        bandera=false;
    }

    const changeButtonState = () => {
        
        bandera = true;
        console.log("entra aca")
    }


    const controlInvalidInput = (parametro) =>{
        if (parametro){
            return(
                <div>
                    <Card id="card-error2">
                        <p>
                            <b>Error: </b> You have entered an invalid email address or password. Please try again.
                        </p>
                    </Card>
                    <Label style={{color:"red"}}>
                        Maximium Login Attempts Exceeded!
                    </Label>
                    <Card id="card-error2">
                        <p>
                            <b>Security is Paramount at Cognitis360</b><br/>
                            When you have exceeded the maximium login attempts, the user record
                            in the database is flagged as password expired. Please reset your password
                            via <b>"Forgot your password?"</b>.
                        </p>
                    </Card>
                </div>
            )
        }
    }

  return (  
    <div>
        <Navbar/>
        <Container fluid>
            <Row>
                <Col lg="12" md="12" xs="12" id="col-naranja" style={{margin:0, padding:0}}>
                   <p></p>
                </Col>
            </Row>
            <Row className="text-center">
                <Col lg="4" md="6" xs="12"> 
                        <Row className="justify-content-end">
                            <Col lg="8" >
                                    <Form style={{marginTop:15}}>
                                        <FormGroup>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="Email addres" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="password" name="password" id="examplePassword" placeholder="Password" required/>
                                        </FormGroup>
                                        <FormGroup check style={{paddingBottom:"5px"}}>
                                            <Label check>
                                                <Input type="checkbox" />{' '}
                                                Remember me
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="primary" id="btn-Login" onClick={changeButtonState()}>Login</Button>
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <Link>Forgot your password?</Link>
                                        </FormGroup>
                                        <FormGroup className="text-left">
                                            {console.log(bandera)}
                                            {controlInvalidInput(bandera)}
                                        </FormGroup>
                                    </Form>
                            </Col>
                        </Row>
                </Col>
                <Col lg="8" md="6" xs="12" className="d-none d-sm-block">
                    <img src={imagenProductivity} alt="Cognitis" id="img-productivity"/>
                </Col>
            </Row>
        </Container>
        <div id="underBackground">
        </div>
    </div>
  );
}

export default LoginUsers;
