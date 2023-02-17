import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = () => {
    const params = useParams();
    const userId = params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  useEffect(() => {
     if(!user.name || user._id !== Number(userId)){
        dispatch(getUserDetails(userId))
     }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
     }
  }, [user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="my-5 p-4">
      <Link className="btn btn-primary" to={"/admin/userlist"}>
        Go Back
      </Link>
      <Container className="bg-dark my-5 p-3">
        <h1 className="mx-auto py-3">Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varaint="danger">{error}</Message>
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

            <Form.Group className="mb-3 py-3" controlId="email">
              <Form.Label style={{ color: "#333" }}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                style={{ color: "#333" }}
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
