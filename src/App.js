import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import {selectUserList, selectIsUsersLoading} from './redux/users/usersSelectors';
import { fetchUsers } from "./redux/users/usersActions";
import Header from './components/header/Header';
import "./App.css";
import CssBaseline from '@mui/material/CssBaseline';
import UserList from "./pages/user-list/UserList";
import UserForm from "./pages/user-form/UserForm";
import CustomAlert from './components/custom-alert/CustomAlert';
import Loader from './components/Loader/Loader';

function App({ fetchUsers, isLoading }) {

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (<Loader />);
  }

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <CustomAlert />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserForm />} />
        <Route path="/add-user" element={<UserForm />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  users: selectUserList,
  isLoading: selectIsUsersLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
