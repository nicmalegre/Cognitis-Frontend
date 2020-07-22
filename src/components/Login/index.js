import React from 'react';
import {Container, Button, FormGroup, Label, Input, Form, Row, CustomInput, Tooltip, Card} from 'reactstrap';
import { BsInfoCircleFill} from "react-icons/bs";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import "./index.css";




class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tooltipOpen: false,
            newPass: '',
            newPassConfirm:null,
        }   
    }

    handleInputChange = (event) =>{ //This function is for control the input that put the user.
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    toggle = () => { //This function is for control the Tooltip specials characters.
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
        }
    
    mostrar = () =>{
        let {newPassConfirm} = this.state

        console.log(newPassConfirm)
    }
    
    render(){
        let {tooltipOpen, newPass} = this.state

        //AGREGAMOS ESTA FUNCION PARA CONTROLAR QUE DEPENDIENDO DEL TIPO DE POLITICA IMPRIMA UNA COSA O LA OTRA
        let controlCharacters = (newPass.length > 7) ? (
                <p className="text-rule correct" id="character-rule"><i className='icon-check'><AiFillCheckCircle/></i> 8 characters</p>
            ) : //If not
            (
                <p className="text-rule" id="character-rule"><i className='icon-check'><AiFillCloseCircle/></i> 8 characters</p>       
            )

        return(
            <Container fluid className="login-container">
                <Row className='justify-content-center Row-General'>
                        <Form>
                            <FormGroup>
                                <Label>Enter a new password for <b>'correo@correo.com'</b></Label><br/>
                                <Label>Make sure to include at least:</Label><br/>
                                {controlCharacters}
                                <p className="text-rule"><i className='icon-check'><AiFillCheckCircle/></i> 1 uppercase letter</p>
                                <p className="text-rule"><i className='icon-check'><AiFillCheckCircle/></i> 1 lowercase letter</p>
                                <p className="text-rule"><i className='icon-check'><AiFillCheckCircle/></i> 1 number</p>
                                <p className="text-rule"><i className='icon-check'><AiFillCheckCircle/></i> 1 special character <BsInfoCircleFill className="info-character" id="info-character"/></p>
                                <Tooltip placement="right" isOpen={tooltipOpen} target="info-character" toggle={this.toggle}>
                                    Los caracteres especiales son: !,@,#,$,%,^,&,*
                                </Tooltip>
                            </FormGroup>
                            <FormGroup>
                                <Label><b>New Password</b></Label>
                                <Input type="password" name={"newPass"} id="newPass"  placeholder="Insert new password" onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword2"><b>Confirm New Password</b></Label>
                                <Input type="password" name={"newPassConfirm"} id="newPassConfirm"  placeholder="Confirm new password"/>
                            </FormGroup>
                            <Row className='justify-content-center'>
                                <Button className="btn-createPass" color="primary">Create Password</Button>
                            </Row>
                            <FormGroup className="formGroup-idioma">
                                <Row className="justify-content-center">
                                    <CustomInput inline type="radio" id="exampleCustomRadio" name="customRadio" label="Español" />
                                    <CustomInput inline type="radio" id="exampleCustomRadio2" name="customRadio" label="Ingles" />
                                </Row>
                            </FormGroup>
                            <Card>
                                <h6>{newPass}</h6>
                            </Card>
                        </Form>
                    
                </Row>
            </Container>
        )
    }
}

export default Login;