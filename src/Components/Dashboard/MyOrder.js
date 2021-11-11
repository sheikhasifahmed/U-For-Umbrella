import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useFirebase from "../../Firebase/useFirebase";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useFirebase();

  const { email, displayName } = user;
  useEffect(() => {
    if (email) {
      fetch(`https://backend-umbrella-asif.herokuapp.com/my-orders/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => console.log(error));
    }
  }, [email]);

  const handleDelete = (id) => {
    let proceed = window.confirm("Are you sure?");
    if (!proceed) return;
    fetch(`https://backend-umbrella-asif.herokuapp.com/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        const remainig = orders.filter((order) => order._id !== id);
        setOrders(remainig);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div
        className="t-order w-100 table-responsive"
        // style={{ overflow: "scroll" }}
      >
        <h3 className="clr text-center">Your orders</h3>
        <table className="my-4 w-100 ">
          <thead>
            {/* <th>order No.</th> */}
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Order Status</th>
            <th></th>
          </thead>
          <tbody>
            {orders.map((p) => (
              <tr>
                {/* <td>{orders.indexOf(b) + 1}</td> */}
                <td>
                  <small>{p._id}</small>
                </td>

                <td>{p.userName}</td>
                <td>{p.productName}</td>
                <td>{p.status}</td>

                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
