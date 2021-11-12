import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import ManageOrders from "./ManageOrders";
import MyOrder from "./MyOrder";
import Review from "./Review";
import Payment from "./Payment";
import useFirebase from "../../Firebase/useFirebase";
import AddProduct from "./AddProduct";

import DashMain from "./DashMain";
import MakeAdmin from "./MakeAdmin";
import AdminRoute from "../PrivateRoute/AdminRoute";
import ManageProducts from "./ManageProducts";

const Dashboard = () => {
  let { path, url } = useRouteMatch();

  const { logOut, admin, isAdminLoading } = useFirebase();

  if (isAdminLoading) {
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
    <div className="top-space">
      <div className="dash-grid">
        <div className="dash-side">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          {admin ? (
            <ul>
              <li>
                <Link to={`${url}/manage-products`}>Manage Products</Link>
              </li>
              <li>
                <Link to={`${url}/manage-orders`}>Manage Orders</Link>
              </li>
              <li>
                <Link to={`${url}/make-admin`}>Make Admin</Link>
              </li>
              <li>
                <Link to={`${url}/add-product`}>Add New Product</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={`${url}/my-orders`}>My Orders</Link>
              </li>

              <li>
                <Link to={`${url}/payment`}>Payment</Link>
              </li>
              <li>
                <Link to={`${url}/review`}>Review Us</Link>
              </li>
            </ul>
          )}

          <ul>
            <li>
              <Button variant="outline-danger" onClick={logOut}>
                Log Out
              </Button>
            </li>
          </ul>
        </div>
        <div className="dash-big">
          <div className="dash-title">
            <h3>Dashboard</h3>
          </div>
          <Switch>
            <Route exact path={`${path}`}>
              <DashMain></DashMain>
            </Route>
            <AdminRoute path={`${path}/manage-products`}>
              <ManageProducts></ManageProducts>
            </AdminRoute>
            <AdminRoute path={`${path}/manage-orders`}>
              <ManageOrders></ManageOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/make-admin`}>
              <MakeAdmin></MakeAdmin>
            </AdminRoute>

            <AdminRoute path={`${path}/add-product`}>
              <AddProduct></AddProduct>
            </AdminRoute>
            <Route path={`${path}/review`}>
              <Review></Review>
            </Route>

            <Route path={`${path}/my-orders`}>
              <MyOrder></MyOrder>
            </Route>
            <Route path={`${path}/payment`}>
              <Payment></Payment>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
