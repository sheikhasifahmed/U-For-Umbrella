import React from "react";
import { Redirect, Route } from "react-router";
import useFirebase from "../../Firebase/useFirebase";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading, admin, isAdminLoading } = useFirebase();
  if (isLoading || isAdminLoading) {
    return (
      <div className="loader">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
        <h3>Please Wait...</h3>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/404",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default AdminRoute;
