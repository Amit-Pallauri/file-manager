import React from "react";
import { Redirect } from "react-router-dom";

const withProtected = (ProtectedComponent) => {
  const user = JSON.parse(localStorage.getItem('token'))
  console.log('user', user)
  return (args) => {
    return !user ? <Redirect to="/signIn" /> : <ProtectedComponent {...args}/>;
  };
};

export default withProtected;