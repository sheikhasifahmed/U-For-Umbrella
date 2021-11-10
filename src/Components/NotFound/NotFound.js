import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        paddingTop: "300px",
        padding: "200px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "100px" }}>Error 404</h1>
      <h1>Page Not Found</h1>
      <h5 style={{ marginTop: "50px" }}>
        <Link to="/home">Click here</Link> to return Homepage
      </h5>
    </div>
  );
};

export default NotFound;
