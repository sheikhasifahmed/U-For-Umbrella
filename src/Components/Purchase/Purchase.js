import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, useParams } from "react-router";

import { Button } from "react-bootstrap";
import useFirebase from "../../Firebase/useFirebase";

const Purchase = () => {
  const { id } = useParams();

  const [order, setOrder] = useState({});
  const { user } = useFirebase();

  const { displayName, email } = user;
  useEffect(() => {
    fetch(`https://backend-umbrella-asif.herokuapp.com/purchase/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);
  const history = useHistory();
  const { productName, price } = order;

  const handlePost = () => {
    let orderData = {
      userName: displayName,
      userEmail: email,
      productName: productName,
      status: "Pending",
    };
    fetch("https://backend-umbrella-asif.herokuapp.com/purchase", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderData),
    }).then(() => {
      alert("Congrates! You have successfully booked your tour package");
      history.push("/");
    });
  };

  return (
    <div className="top-space">
      <div className="t-order" style={{ marginTop: "50px" }}>
        <h3>Order Request</h3>
        <table className="my-4 w-100">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{displayName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>{productName}</td>
            </tr>
            <tr>
              <td>Total Expense</td>
              <td>${price}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <Button variant="outline-success" onClick={handlePost}>
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
