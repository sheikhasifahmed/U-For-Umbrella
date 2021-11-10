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

const Dashboard = () => {
  let { path, url } = useRouteMatch();

  const { logOut } = useFirebase();

  return (
    <div className="top-space">
      <div className="dash-grid">
        <div className="dash-side">
          <ul>
            <li>
              <Link to={`${url}/manage-orders`}>Manage Orders</Link>
            </li>
            <li>
              <Link to={`${url}/my-orders`}>My Orders</Link>
            </li>
            <li>
              <Link to={`${url}/review`}>Review Us</Link>
            </li>
            <li>
              <Link to={`${url}/payment`}>Payment</Link>
            </li>
            <li>
              <Link to={`${url}/add-product`}>Add New Product</Link>
            </li>
            <li>
              <Button variant="outline-danger" onClick={logOut}>
                Log Out
              </Button>
            </li>
          </ul>
        </div>
        <div className="dash-big">
          <h3>Welcome to DashBoard</h3>
          <Switch>
            <Route path={`${path}/manage-orders`}>
              <ManageOrders></ManageOrders>
            </Route>
            <Route path={`${path}/add-product`}>
              <AddProduct></AddProduct>
            </Route>
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
