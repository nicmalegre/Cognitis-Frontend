import React,{useState, useEffect} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import {Link } from "react-router-dom";
import {Label, Input} from "reactstrap";
import { BsPlusCircle } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import CatalogLayout from "../../Layouts/CatalogLayout";
import axios from "axios";
import './index.css'


const SearchProducts = () => {


//Estado de tipo arreglo que sirve para almacenar la respuesta de la peticion a la API
let [resultSearch, setResults] = useState ([])


//Objeto que se pasa por parametro en la peticion. Por defecto los valores de los campos son 'all' debido a que no filtra
const [datosPeticion, setDatosPeticion] = useState ({
  product_id: null,
  product_name: null,
  product_brand: null,
  product_providers: null,
  category: null,
  product_type: null
})




//Funcion que controla el input del codigo de producto
const setCode = (event) => {

  setDatosPeticion({
    ...datosPeticion,
    product_id: parseInt(event.target.value)
  })
  
}

//Funcion que controla el input del nombre de producto
const setName = (event) => {
  setDatosPeticion({
    ...datosPeticion,
    product_name: (event.target.value === "") ? null : event.target.value
  })
}

//Funcion que controla el filtro de la marca
const setMark = (event) => {
  setDatosPeticion({
    ...datosPeticion,
    product_brand: event.target.value 
  })
}

//Funcion que controla el filtro del proveedor
const setProvider = (event) => {
  setDatosPeticion({
    ...datosPeticion,
    product_providers: event.target.value 
  })
}

//Funcion que controla el filtro del tipo de producto
const setCategory = (event) => {
  setDatosPeticion({
    ...datosPeticion,
    category: event.target.value 
  })
}

//Funcion que controla el filtro del tipo de producto
const setType = (event) => {
  setDatosPeticion({
    ...datosPeticion,
    product_type: event.target.value 
  })
}


//Funcion que se ejecuta al solicitar una busqueda.
const getResult = (datosPeticion) => { //Se pasan los filtros como parametro de la funcion
  
  console.log(datosPeticion)
  
  axios.post('https://cognitis-360.herokuapp.com/api/products/filters', datosPeticion ) //Aplicar los parametros que entran en getResult
  .then( res => { 
    console.log(res);
    setResults(
      resultSearch = res.data
    )

  }).catch(err => console.log(err)); //mostrar error

}





  return (
    <CatalogLayout>
      <Container fluid>
        <Row>
          <Col md={9}>
            <Row className="pt-3 pl-3">
              <h2>Buscar Productos</h2>
            </Row>
            <Row className="p-3">
              <Card style={{ width: "100%" }}>
                <Card.Header>Search</Card.Header>
                <Row className="p-3">
                  <Form className="ml-3 w-75">
                    <Row>
                      <Col className="d-flex">
                        <Label>Product Name</Label>
                        <Form.Control onChange={setName} />
                        {/* <Input onChange={setName}></Input> */}
                      </Col>
                      <Col className="d-flex">
                        <label>Product Code</label>
                        <Form.Control onChange={setCode} />
                      </Col>
                    </Row>
                  </Form>
                </Row>
                <Row className="d-flex justify-content-start pl-3 pb-3">
                  <Button variant="primary ml-3" onClick={() => getResult(datosPeticion)}>Buscar</Button>
                </Row>
              </Card>
            </Row>
          </Col>
          <Col md={3}>
            <Card style={{ width: "100%" }} className="mt-3">
              <Card.Header>Filters</Card.Header>
              <Form className="p-3">
                <Form.Control as="select" onChange={setMark} className="mb-1">
                  <option>Marca</option>
                </Form.Control>
                <Form.Control as="select" onChange={setProvider} className="mb-1">
                  <option>Proovedor</option>
                </Form.Control>
                <Form.Control as="select" onChange={setCategory} className="mb-1">
                  <option>Categoría</option>
                </Form.Control>
                <Form.Control as="select" onChange={setType} className="mb-1">
                  <option>Tipo de Producto</option>
                </Form.Control>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Card style={{ width: "100%" }} className="ml-3 mr-3 p-3">
            <Row>
              <Table bordered striped hover className="ml-3 mr-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dolarize</th>
                    <th>Status</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                      
                      {resultSearch.map( (product) => (
                        <tr>
                        <td>{product.product_id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.product_is_dollar ? 'Si' : 'No' }</td>
                        <td>{product.product_status ? 'Activo' : 'Inactivo'}</td>
                        <td>{product.product_brand}</td>
                        <td>{product.category}</td>
                        <td>{product.product_type}</td>


                        <td>
                        <Link to="/catalog/editproduct" >
                        <Button id="button-edit" size="sm"  >
                          <i className="mr-1">< MdModeEdit/></i>
                          <span className="align-middle">Edit</span>
                        </Button>{" "}
                        {"   "}
                        </Link>
                        <Button
                          id="button-delete"
                          size="sm"                          
                        >
                        <i className="mr-1"><AiTwotoneDelete /></i>
                        <span className="align-middle">Delete</span>
                        </Button>{" "}

                        {"   "}
                        <Link to={`/catalog/productview/${product.product_id}`}>
                          <Button id="button-view" size="sm"  >
                            <i className="mr-1"><BsPlusCircle/></i>
                            <span className="align-middle">More</span>
                          </Button>
                          
                        </Link>
                        </td>
                      </tr> 
                      ))}                    


                  
                </tbody>
              </Table>
            </Row>
            <Row className="d-flex justify-content-end">
              <Pagination className="mr-3">
                <Pagination.Prev disabled />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Row>
          </Card>
        </Row>
      </Container>
    </CatalogLayout>
  );
};

export default SearchProducts;
