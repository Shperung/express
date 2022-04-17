import React, { FormEvent, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import logo from "./logo.svg";
import "./App.css";
import { GET_ALL_USERS, GET_ONE_USER } from "./query-user";
import { CREATE_USER } from "./mutation-user";

type UserType = {
  id: number;
  username: string;
  age: string;
};

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [oneUserId, setOneUserId] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const { data: dataOneUser, loading: loadingOneUser } = useQuery(
    GET_ONE_USER,
    {
      variables: {
        id: oneUserId,
      },
    }
  );

  const [users, setUsers] = useState<UserType[]>([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(1);
  const [newUser] = useMutation(CREATE_USER);

  const oneUser = dataOneUser?.getUser;

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await newUser({
        variables: {
          input: {
            username,
            age,
          },
        },
      });

      console.log("%c ||||| data", "color:yellowgreen", data);
      setUsername("");
      setAge(0);
      refetch();
    } catch (error) {
      alert("ne ok");
    }
  };

  const getAll = () => {
    refetch();
  };

  const getOneUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOneUserId(id);
  };

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
  }, [data, loading]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GrapgQl</h1>
      </header>
      <section className="grid">
        <article>
          <h2>All users</h2>
          <form onSubmit={(e) => addUser(e)} className="form">
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <input
              value={age}
              required
              onChange={(e) => setAge(+e.target.value)}
              type="number"
            />
            <button>Add user</button>
          </form>
          <div className="form">
            <button onClick={getAll}>Get all users</button>
          </div>
          <div>
            {loading ? (
              <h2>Loading...</h2>
            ) : users.length ? (
              users.map((user) => (
                <div key={user?.id}>
                  {user?.id} | {user?.username}
                </div>
              ))
            ) : null}
          </div>
        </article>
        <article>
          <h2>One user</h2>
          <form onSubmit={(e) => getOneUser(e)} className="form">
            <input
              required
              value={id}
              onChange={(e) => setId(+e.target.value)}
              type="text"
            />
            <button>Find user by id</button>
          </form>
          {oneUser?.id ? (
            <div>
              {oneUser?.id || ""} | {oneUser?.username || ""} |
              {oneUser?.age || ""}
            </div>
          ) : null}
        </article>
      </section>
    </div>
  );
}

export default App;
