import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
const ProductListScreen = () => {
    // const params = useParams();
    // const products = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading:loadingDelete, error: errorDelete, success: successDelete } = productDelete;


  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search 

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET} )

    if (!userInfo.isAdmin) {
        navigate("/login")
    } 

    if(successCreate){
       navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(listProducts(keyword))
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
   dispatch(deleteProduct(id))
    }
  };

  const createProductHandler = () =>{
    dispatch(createProduct())
  }
  
  return (
    <div className="my-3 p-5">
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3 btn btn-dark position-relative"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm bg-light"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>MODEL</th>
                <th>MAKE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.model}</td>
                  <td>{product.make}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} ></Paginate>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
