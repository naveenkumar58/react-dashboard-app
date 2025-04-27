import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Card from "./components/card/card";
import useFetch from "./hooks/useFetch";
import Users from "./models/Users.types";
import { Grid } from "@mui/material";
import Post from "./models/Post";
import Todo from "./models/Todo";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = "https://jsonplaceholder.typicode.com/";

function App() {
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
    fetchData: fetchUsers,
  } = useFetch<Users[]>();
  const {
    data: userPosts,
    loading: loadingUserPosts,
    error: errorUserPosts,
    fetchData: fetchUserPosts,
  } = useFetch<Post[]>();
  const {
    data: userTodos,
    loading: loadingUserTodos,
    error: errorUserTodos,
    fetchData: fetchUserTodos,
  } = useFetch<Todo[]>();

  const [searchUser, setSearchUser] = useState<Users[] | null>([]);

  const fetchPostsAndTodos = (id: number, expanded: boolean) => {

    if (expanded) {
      fetchUserPosts(`${API_URL}posts?userId=${id}`);
      fetchUserTodos(`${API_URL}todos?userId=${id}`);
    }
  };

  useEffect(() => {
    fetchUsers(`${API_URL}users`);
  }, []);

  useEffect(() => {
    setSearchUser(users);
  }, [users]);

  const fetchFilteredUsers = (userName: string) => {
    if (userName == "") {
      setSearchUser(users);
    } else if (userName && users && users.length > 0) {
      setSearchUser(
        users?.filter((user) =>
          user.name.toLowerCase().includes(userName.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="App">
      <Header onSearchUser={(username) => fetchFilteredUsers(username)} />
      <div className="container">
        <div className="usersContainer">
          {loadingUsers && (
            <div className="loader-container">
              <CircularProgress className="loader" />
            </div>
          )}
          {!loadingUsers && (
            <Grid container spacing={2}>
              {errorUsers && <h1>API Error!</h1>}
              {searchUser &&
                Array.isArray(searchUser) &&
                searchUser.map((element: Users) => {
                  return (
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
                      <Card
                        name={element.name}
                        email={element.email}
                        company={element.company.name}
                        id={element.id}
                        posts={userPosts}
                        todos={userTodos}
                        onAccordionChange={(userId, expanded) =>
                          fetchPostsAndTodos(userId, expanded)
                        }
                        postsLoading={loadingUserPosts}
                        todosLoading={loadingUserTodos}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
