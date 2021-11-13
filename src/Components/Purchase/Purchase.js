import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import useFirebase from "../../Firebase/useFirebase";

const Purchase = () => {
  const { register, handleSubmit } = useForm();

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

  const onSubmit = (data) => {
    data.status = "Pending";
    fetch("https://backend-umbrella-asif.herokuapp.com/purchase", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Congrates! your order is successful..");
      history.push("/");
    });
  };

  return (
    <div className="top-space">
      <div className="t-order" style={{ marginTop: "50px" }}>
        <h4 style={{ textAlign: "center" }}>Order Info</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="form-style">
          {/* <label>Customer Name</label> */}
          <input
            defaultValue={displayName}
            {...register("userName", { required: true })}
          />
          <input
            defaultValue={email}
            {...register("userEmail", { required: true })}
          />
          <input
            defaultValue={productName}
            {...register("productName", { required: true })}
          />

          <input
            Placeholder="Delivery Address"
            {...register("Address", { required: true })}
          />
          <input Placeholder="Contact Number" {...register("Contact Number")} />
          <h5>Product Price: ${price}</h5>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="outline-success">
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
