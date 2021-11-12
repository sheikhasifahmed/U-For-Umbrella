import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleDelete = (id) => {
    let proceed = window.confirm("Are you sure to cancel this order?");
    if (!proceed) return;
    fetch(`https://backend-umbrella-asif.herokuapp.com/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        const remainig = orders.filter((order) => order._id !== id);
        setOrders(remainig);
      })
      .catch((error) => alert("Ops! something went wrong!"));
  };

  const handleShipped = (id) => {
    const Shipped = orders.find((p) => p._id === id);

    Shipped.status = "Shipped";

    fetch(`https://backend-umbrella-asif.herokuapp.com/orders/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Shipped),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("order Shipped by Admin");
          // window.location.reload()
          const remaining = orders.filter((p) => p._id !== id);
          const neworders = [...remaining, Shipped];
          setOrders(neworders);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="top-space">
      <div
        className="t-order w-100 table-responsive"
        style={{ marginBottom: "150px" }}
      >
        <h3>Manage All orders as Admin </h3>
        <table className="my-4 w-100 ">
          <thead>
            {/* <th>order No.</th> */}
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Order Status</th>
            <th></th>
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
                  {p.status === "Shipped" || (
                    <Button
                      onClick={() => handleShipped(p._id)}
                      variant="outline-success"
                    >
                      Ship Order
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(p._id)}
                    variant="outline-danger"
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

export default ManageOrders;
