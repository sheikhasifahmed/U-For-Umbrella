import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    fetch("https://backend-umbrella-asif.herokuapp.com/add-product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Product Added Successfully...");
    });

    reset();
  };

  return (
    <div
      className="row"
      style={{
        textAlign: "center",
      }}
    >
      <div
        className="mx-auto col-lg-6 pb-3"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <h3 style={{ color: "grey", marginTop: "30px" }}>
          Input the data to add a new package
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form-style">
          <input placeholder="Product Name" {...register("productName")} />

          <input placeholder="Product Details" {...register("details")} />

          <input {...register("price")} placeholder="Product Pricre" />

          <input placeholder="Product Rating" {...register("rating")} />

          <input {...register("image")} placeholder="Product image url" />

          <div className="mx-auto">
            <Button type="submit" variant="outline-success">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
