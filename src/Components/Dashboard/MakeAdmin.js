import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAdmin = (email) => {
    const selected = users.find((user) => user.email === email);
    console.log(selected);
    let proceed = window.confirm(
      `Are you sure to promote "${selected.displayName}" as an Admin?`
    );
    if (!proceed) return;
    selected.role = "Admin";
    fetch(`https://backend-umbrella-asif.herokuapp.com/users/${email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(selected),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert(
            `${selected.displayName} has been promoted to an Admin successfully`
          );
          // const remaining = users.filter((user) => user.email !== email);
          // const rearrange = [selected, ...remaining];
          // setUsers(rearrange);
          window.location.reload();
        }
      })

      .catch((error) => {
        alert("Ops! something went wrong...");
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="t-order w-100 table-responsive"
        style={{ marginBottom: "150px" }}
      >
        <h3>Manage All users as Admin </h3>
        <table className="my-4 w-100 ">
          <thead>
            <th>Users Name</th>
            <th>
              <small>User Email</small>
            </th>
            <th>User Role</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "Admin" ? (
                    user.role
                  ) : (
                    <Button
                      onClick={() => handleAdmin(user.email)}
                      variant="outline-success"
                    >
                      Make Admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
