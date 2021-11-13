import React from "react";
import pic from "../../images/discount.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Coupon = () => {
  return (
    <div className="cont">
      <div className="row bcolor">
        <div className="col-lg-6 ">
          <h3>Grab The Discout !</h3>
          <h5>
            This is a festival offer only for you as a valuabe customer. Use{" "}
            <span style={{ color: "red", fontWeight: "600" }}>
              "Happy Shopping"
            </span>{" "}
            to get this discount.
          </h5>
          <p>
            Discount Conditions: <br />
            You can only use this discount for shopping over $100. One person
            can use coupon one time. This coupon is valid for only the festival
            time. <br />
            During the festival offer, one person can use this coupon one time
            for $100 or more purchase. <br />
            The coupon will provide 25% discount upto $50.
          </p>
        </div>
        <div className="col-lg-6">
          <img className="img-fluid" src={pic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Coupon;
