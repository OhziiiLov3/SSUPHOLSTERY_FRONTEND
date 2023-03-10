import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod} from "../actions/cartActions";

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("Paypal")

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }
 
  return (
    <div className="my-3 p-5">
      <Container className="my-5 p-3">
         <Row className="justify-content-md-center bg-secondary">
          <Col xs={12} md={6}>
      <Checkout step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="text-white"
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button className='my-3' type="submit" variant="primary">
          Continue
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
    </div>
  );
}

export default PaymentScreen