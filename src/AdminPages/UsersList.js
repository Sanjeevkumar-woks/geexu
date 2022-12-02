import React, { useEffect, useState } from "react";

export default function UserList() {
  const [userList, setUserList] = useState([]);

  const get = () => {
    fetch("http://localhost:9000/users/api/v2/people/users")
      .then((data) => data.json())
      .then((d) => console.log(d));
  };
  const del = (id) => {
    fetch(`http://localhost:9000/users//api/v2/people/users/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() => get());
  };

  useEffect(get, []);

  const Delete = (_id) => {
    setUserList(userList.filter((user) => user._id !== _id));
  };

  return (
    <div className="App">
      <p>Userlist</p>
    </div>
  );
}
