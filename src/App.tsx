import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Card from "./components/card/card";
import useFetch from "./hooks/useFetch";
import Users from "./models/Users.types";
import { Grid } from "@mui/material";

function App() {
  const usersAPIResponse = useFetch<Users[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Grid container spacing={2}>
          {usersAPIResponse.error && <h1>API Error!</h1>}
          {!usersAPIResponse.error &&
            Array.isArray(usersAPIResponse.data) &&
            usersAPIResponse.data.map((element: Users) => {
              return (
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
                  <Card
                    name={element.name}
                    email={element.email}
                    company={element.company.name}
                    id={element.id}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default App;
