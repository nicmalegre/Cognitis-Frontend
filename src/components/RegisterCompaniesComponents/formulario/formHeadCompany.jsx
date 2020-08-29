import React, { useState, useContext } from "react";
import { CompanyContext } from "../../../store/CompanyContext";
//importacion de la libreria
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  Button,
  Input,
  Row,
  Container,
  Col,
  Label,
  Card,
  Form,
} from "reactstrap"; //importar elementos
//import "../RegisterHeadCompany/index.css"; //importar css
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "../../WizardComponents/base/logo";
import "./index.css";
import { MdLineWeight } from "react-icons/md";

const FormHeadCompany = (props) => {
  //clase 'Nombre' extends React.component
  const { register, trigger, handleSubmit, errors } = useForm();

  //mediante context almaceno en una variable global el head_house_id al registrar mi compañia house
  const [dataCompany, setDataCompany] = useContext(CompanyContext);
  
  
  // // concateno los datos de codpais + codarea + head_tel para almacenalo en la BD como head_tel
  // const changeTel = (data) => {
  //   data.head_tel = data.codPais + data.codArea + data.head_tel;
  // };

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/head_house/registerheadhouse", data)
    .then((res) =>    
    //setDataCompany({...setDataCompany, head_house_id: res.data})
     props.history.push("/registercompany/"+ res.data)
    )
    .catch((err) => console.log(err));
     //props.history.push("/registercompany");
  };

  const [input, setInput] = useState({
    value: false,
  });

  // const of countries
  const countries = [
    "Argentina",
    "Australia",
    "Bolivia",
    "Canada",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "New Zealand",
    "Paraguay",
    "Peru",
    "Surinam",
    "USA",
    "Uruguay",
    "Venezuela",
  ];

  const inputChange = async (event) => {
    let value = "";
    let inputvalue = event.target.value;
    let length = inputvalue.length;
    let name = event.target.name;
    let noerror = await trigger(name);

    if (length > 0 && noerror) {
      value = errors?.name ? false : true;
    } else {
      value = false;
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  //Funcion que renderiza el componente visual jsx
  return (
    <Container fluid>
      <Row>
        <Col lg="4" md="4" xs="10">
          <Logo />
        </Col>
        <Col lg="8" xs="10">
          <h3 className="mt-5 text" style={{ marginBottom: 30 }}>
            Ingrese datos de la Compañia Matriz
          </h3>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Card id="card-user">
            <Form onSubmit={handleSubmit(onSubmit)} id="card-user" /*body*/>
              <br />
              <h6 className="text">Datos de la Compañia Matriz</h6>
              <Row form>
                <Col md={6}>
                  <span className="text-danger font-weight-bold">*</span>{" "}
                  <Label for="nameHeadCompany">
                    Nombre de la Compañia Matriz
                  </Label>
                  <Input
                    type="text"
                    name="head_name"
                    placeholder="ingrese el nombre de la compañia matriz"
                    valid={input.head_name}
                    onChange={inputChange}
                    innerRef={register({
                      required: {
                        value: true,
                        message: "Compañia Matriz es requerido",
                      },
                    })}
                  />
                  <span className="text-danger span d-block mb-2">
                    {errors?.head_name?.message}
                  </span>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="razonsocial">Razon Social</Label>
                    <Input
                      type="text"
                      name="head_business_name"
                      valid={input.head_business_name}
                      onChange={inputChange}
                      innerRef={register({
                        required: {
                          value: true,
                          message: "Razon Social es requerido",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.head_business_name?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="Cuil">CUIL o CUIT</Label>
                    <Input
                      //type="number"
                      name="head_cuit"
                      id="Cuil"
                      valid={input.head_cuit}
                      onChange={inputChange}
                      placeholder="Ejemplo XX12345678X"
                      maxLength="11"
                      innerRef={register({
                        required: {
                          value: true,
                          message: "Cuil o Cuit es requerido",
                        },
                        maxLength: {
                          value: 11,
                          message: "No más de 11 carácteres!",
                        },
                        minLength: {
                          value: 11,
                          message: "No menos de 11 carácteres!",
                        },
                        pattern: {
                          value: /^[0-9]{11}$/i,
                          message: "Solo caracteres numéricos",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.head_cuit?.message}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="pais">Pais</Label>
                    <Input
                      type="select"
                      name="head_country"
                      onChange={inputChange}
                      valid={input.head_country}
                      onChange={inputChange}
                      innerRef={register({
                        required: {
                          value: false,
                        },
                      })}
                      
                    >
                      {/* Function to insert the countries of the array like items in dropdown menu */}
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="head_email"
                      valid={input.head_email}
                      onChange={inputChange}
                      placeholder="Ingrese su email"
                      innerRef={register({
                        required: "Email es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.head_email?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <span className="text-danger font-weight-bold">*</span>{" "}
                        <Label for="codPais">Cod Pais</Label>
                        <Input
                          type="text"
                          name="country_code"
                          valid={input.country_code}
                          onChange={inputChange}
                          placeholder="+54"
                          maxLength="5"
                          innerRef={register({
                            required: {
                              value: true,
                              message: "Codigo de Pais es requerido",
                            },
                            minLength: {
                              value: 2,
                              message: "No menos de 3 carácteres!",
                            },
                            pattern: {
                              value: /^[+][0-9]{1,5}$/i,
                              message: "codigo de pais invalido",
                            },
                          })}
                        />
                        <span className="text-danger span d-block mb-2">
                          {errors?.country_code?.message}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <span className="text-danger font-weight-bold">*</span>{" "}
                        <Label for="codArea">Cod Area</Label>
                        <Input
                          type="number"
                          name="area_code"
                          valid={input.area_code}
                          onChange={inputChange}
                          innerRef={register({
                            required: {
                              value: true,
                              message: "Codigo de Area es requerido",
                            },
                            maxLength: {
                              value: 4,
                              message: "No más de 4 numeros!",
                            },
                            minLength: {
                              value: 2,
                              message: "No menos de 2 numeros!",
                            },
                          })}
                        />
                        <span className="text-danger span d-block mb-2">
                          {errors?.area_code?.message}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <span className="text-danger font-weight-bold">*</span>{" "}
                        <Label for="nrotel">Nro. Telefono</Label>
                        <Input
                          type="number"
                          name="head_tel"
                          id="nrotel"
                          valid={input.head_tel}
                          onChange={inputChange}
                          innerRef={register({
                            required: {
                              value: true,
                              message: "Numero de Telefono es requerido",
                            },
                            maxLength: {
                              value: 11,
                              message: "No más de 11 numeros!",
                            },
                            minLength: {
                              value: 4,
                              message: "No menos de 4 numeros!",
                            },
                          })}
                        />
                        <span className="text-danger span d-block mb-2">
                          {errors?.head_tel?.message}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nroFax">Fax</Label>
                    <Input
                      type="text"
                      name="head_fax"
                      id="nroFax"
                      valid={input.head_fax}
                      onChange={inputChange}
                      placeholder="Ingrese el nro de fax Ejemplo +54XXXXXXXXXX"
                      innerRef={register({
                        required: {
                          value: false,
                        },
                        maxLength: {
                          value: 20,
                          message: "No más de 20 numeros!",
                        },
                        minLength: {
                          value: 6,
                          message: "No menos de 6 numeros!",
                        },
                        pattern: {
                          value: /^[+][0-9]{6,20}$/,
                          message: "Nro de fax invalido",
                        },
                      })}
                    />
                      <span className="text-danger span d-block mb-2">
                      {errors?.head_fax?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <h6 className="text">Datos Bancarios</h6>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="nameBank">Nombre del Banco</Label>
                    <Input
                      type="text"
                      name="bank_head_house_name"
                      maxLength="45"
                      valid={input.bank_head_house_name}
                      onChange={inputChange}
                      placeholder="Ingrese el nombre del banco"
                      innerRef={register({
                        required: {
                          value: true,
                          message: "Nombre del banco es requerido",
                        },
                        maxLength: {
                          value: 45,
                          message: "No más de 45 caracteres!",
                        },
                        minLength: {
                          value: 3,
                          message: "No menos de 3 caracteres!",
                        },
                        pattern: {
                          value: /^[A-Z]+$/i,
                          message: "nombre del banco invalido",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.bank_head_house_name?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="cuentaBancaria">
                      Numero de Cuenta Bancaria
                    </Label>
                    <Input
                      type="number"
                      name="bank_head_house_account"
                      maxLength="12"
                      valid={input.bank_head_house_account}
                      onChange={inputChange}
                      placeholder="Ingrese su nro de cuenta bancaria"
                      innerRef={register({
                        required: {
                          value: true,
                          message: "Numero de cuenta bancaria es requerido",
                        },
                        pattern: {
                          value: /^\d{3}-\d{6}[/]\d{1}/i,
                          message: "Numero de cuenta bancaria invalido",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.bank_head_house_account?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <span className="text-danger font-weight-bold">*</span>{" "}
                    <Label for="cbu">CBU</Label>
                    <Input
                      type="number"
                      name="bank_head_house_cbu"
                      id="cbu"
                      valid={input.bank_head_house_cbu}
                      onChange={inputChange}
                      placeholder="Ingrese el nro de CBU"
                      innerRef={register({
                        required: {
                          value: true,
                          message: "Numero de CBU es requerido",
                        },
                        maxLength: {
                          value: 22,
                          message: "No más de 22 numeros",
                        },
                        minLength: {
                          value: 22,
                          message: "No menos de 22 numeros",
                        },
                        pattern: {
                          value: /^\d{22}$/i,
                          message: "Numero de cbu invalido",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.bank_head_house_cbu?.message}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="alias">Alias</Label>
                    <Input
                      type="text"
                      name="bank_head_house_alias"
                      valid={input.bank_head_house_alias}
                      onChange={inputChange}
                      maxLength="20"
                      placeholder="Ingrese su alias"
                      innerRef={register({
                        required: {
                          value: false,
                        },
                        minLength: {
                          value: 6,
                          message: "No menos de 6 caracteres!",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9.-]{6,20}$/i,
                          message: "alias invalido",
                        },
                      })}
                    />
                    <span className="text-danger span d-block mb-2">
                      {errors?.bank_head_house_alias?.message}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Row
                className="row justify-content-end"
                style={{ marginTop: 10 }}
              >
                <Col md={2}>
                  {/*<Link to="/NumberCompanies">*/}
                  <Button color="primary" type="Submit" active>
                    Continuar
                  </Button>
                  {/*</Link>*/}
                </Col>
              </Row>
              <br />
            </Form>
          </Card>
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(FormHeadCompany);
