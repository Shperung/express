import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import logo from "./logo.svg";
import "./App.css";
import { GET_ALL_USERS } from "./user";

type UserType = {
  id: number;
  username: string;
  age: string;
};

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState<UserType[]>([]);

  console.log("%c ||||| data", "color:yellowgreen", data);

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
  }, [data, loading]);

  return (
    <div className="App">
      <header className="App-header">
        <form className="form">
          <input type="text" />
          <input type="number" name="" />
          <button>SET</button>
          <button>GET</button>
        </form>
        <div>
          {loading ? (
            <h2>Loading...</h2>
          ) : users.length ? (
            users.map((user) => (
              <div key={user?.id}>
                {user?.id} | {user?.username} | {user?.age}
              </div>
            ))
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
