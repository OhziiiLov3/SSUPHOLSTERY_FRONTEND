import React, {  useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";


const UserListScreen = () => {

const dispatch = useDispatch()
const navigate = useNavigate()  

const userList = useSelector(state => state.userList)
const {loading, error, users} =  userList


const userLogin = useSelector((state) => state.userLogin  );
const { userInfo } = userLogin;

const userDelete = useSelector((state) => state.userDelete  );
const { success: sucessDelete } = userDelete;


 
useEffect((  ) => {
  if (userInfo && userInfo.isAdmin) {
    dispatch(listUsers());
  } else {
    navigate("/login");
  }
}, [dispatch, navigate, sucessDelete,userInfo]);

const deleteHandler = (id) =>{
  if(window.confirm('Are you sure you want to delete this user?')){
dispatch(deleteUser(id));
  }
    
}
  return (
    <div className="my-3 p-5">
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm bg-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  ); 
};

export default UserListScreen;
