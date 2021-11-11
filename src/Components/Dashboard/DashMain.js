import React from "react";
import dashpic from "../../images/dashboard.png";
import "bootstrap/dist/css/bootstrap.min.css";

const DashMain = () => {
  return (
    <div className="d-flex justify-content-center">
      {/* <h3>hello</h3> */}
      <div>
        <img src={dashpic} alt="" />
      </div>
    </div>
  );
};

export default DashMain;
