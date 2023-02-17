import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers } from "../actions/userActions";


const UserListScreen = () => {
const dispatch = useDispatch()

const userList = useSelector(state => state.userList)
const {loading, error, users} =  userList

useEffect(()=>{
    dispatch(listUsers())
},[dispatch])


  return (
    <div className="my-3 p-5">
      <h1>Users</h1>
      {loading
      ? (<Loader/>)
    : error
    ? (<Alert variant="danger">{error}</Alert>)
        : (
            <Table striped bordered hover responsive className="table-sm bg-light">
                    <thead>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {users.map(user =>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className="fas fa-check" style={{color: 'green'}}></i>
                                ):(
                                    <i className="fas fa-check" style={{color: 'red'}}></i>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
        )}
    </div>
  ); 
};

export default UserListScreen;
