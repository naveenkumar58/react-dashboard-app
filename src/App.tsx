import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Card from "./components/card/card";
import useFetch from "./hooks/useFetch";
import Users from "./models/Users.types";
import { Grid } from "@mui/material";
import Post from "./models/Post";
import Todo from "./models/Todo";

function App() {
  const { data: users, loading: loadingUsers, error: errorUsers, fetchData: fetchUsers } = useFetch<Users[]>();
  const { data: userPosts, loading: loadingUserPosts, error: errorUserPosts, fetchData: fetchUserPosts } = useFetch<Post[]>();
  const { data: userTodos, loading: loadingUserTodos, error: errorUserTodos, fetchData: fetchUserTodos } = useFetch<Todo[]>();


  const fetchPostsAndTodos = (id: number,expanded:boolean) => {
    if(expanded){
      fetchUserPosts(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
  
      fetchUserTodos(
        `https://jsonplaceholder.typicode.com/todos?userId=${id}`
      );
    }

  };

  useEffect(() => {
    fetchUsers(
      "https://jsonplaceholder.typicode.com/users"
    );
  },[]);


  return (
    <div className="App">
      <Header />

      <div className="container">
        <Grid container spacing={2}>
          {errorUsers && <h1>API Error!</h1>}
          {users &&
            Array.isArray(users) &&
            users.map((element: Users) => {
              return (
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
                  <Card
                    name={element.name}
                    email={element.email}
                    company={element.company.name}
                    id={element.id}
                    posts={userPosts}
                    todos={userTodos}
                    onAccordionChange={(userId,expanded) => fetchPostsAndTodos(userId,expanded)}
                    postsLoading={loadingUserPosts}
                    todosLoading={loadingUserTodos}
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
