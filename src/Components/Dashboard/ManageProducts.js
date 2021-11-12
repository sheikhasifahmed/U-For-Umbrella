import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleDelete = (id) => {
    let proceed = window.confirm("Are you sure to cancel this order?");
    if (!proceed) return;

    fetch(`https://backend-umbrella-asif.herokuapp.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        const remaining = products.filter((p) => p._id !== id);
        setProducts(remaining);
      })
      .catch((error) => alert("Ops! Something went wrong..."));
  };

  return (
    <div>
      <div>
        {products.map((pd) => (
          <div className="manage-products">
            <div>
              <img src={pd.image} width="100" alt="" />
            </div>
            <div>
              <h3>{pd.productName}</h3>
            </div>
            <div>
              <h3>${pd.price}</h3>
            </div>
            <div>
              <Button
                onClick={() => handleDelete(pd._id)}
                variant="outline-danger"
              >
                Delete Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
