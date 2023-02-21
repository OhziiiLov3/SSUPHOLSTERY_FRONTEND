import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listProductDetails} from "../actions/productActions";


const ProductEditScreen = () => {
  const params = useParams();
  const productId = params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.procductDetails);
  const { error, loading, product } = productDetails;

 

  useEffect(() => {

      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setMake(product.make);
        setModel(product.model);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        ;
      }
  }, [dispatch,product, productId, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
// Update product
  };

  return (
    <div className="my-5 p-4">
      <Link className="btn btn-primary" to={"/admin/productlist"}>
        Go Back
      </Link>
      <Container className="bg-dark my-5 p-3">
        <h1 className="mx-auto py-3">Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert varaint="danger">{error}</Alert>
        ) : (
          <Form variant="light" onSubmit={submitHandler}>
            <Form.Group className="mb-3 py-3" controlId="name">
              <Form.Label style={{ color: "#333" }}>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="price">
              <Form.Label style={{ color: "#333" }}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="image">
              <Form.Label style={{ color: "#333" }}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="make">
              <Form.Label style={{ color: "#333" }}>Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="model">
              <Form.Label style={{ color: "#333" }}>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="countInStock">
              <Form.Label style={{ color: "#333" }}>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 py-3" controlId="description">
              <Form.Label style={{ color: "#333" }}>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="my-3 p-2" type="submit" variant="light">
              Update
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default ProductEditScreen;
