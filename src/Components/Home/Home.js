import React from "react";
import Banner from "./Banner";
import Coupon from "./Coupon";
import Prd from "./Prd";
import ShowReview from "./Review/ShowReview";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Prd></Prd>
      <ShowReview></ShowReview>
      <Coupon></Coupon>
    </div>
  );
};

export default Home;
