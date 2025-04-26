import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Card from "./components/card/card";
import useFetch from "./hooks/useFetch";
import Users from "./models/Users.types";

function App() {
  const usersAPIResponse = useFetch<Users[]>("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="App">
      <Header />

      <div className="container">
        {usersAPIResponse.error && <h2>API Error!</h2>}
        {usersAPIResponse.data && !usersAPIResponse.error &&
          Array.isArray(usersAPIResponse.data) &&
          usersAPIResponse.data.map((element: Users) => {
            return (
              <Card
                name={element.name}
                email={element.email}
                company={element.company.name}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
