import { useEffect, useState } from "react";
import Header from "./components/header/header";
import Card from "./components/card/card";
import useFetch from "./hooks/useFetch";
import Users from "./models/Users.types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./App.module.css";

const API_URL = "https://jsonplaceholder.typicode.com/";

function App() {
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
    fetchData: fetchUsers,
  } = useFetch<Users[]>();

  const [searchUser, setSearchUser] = useState<Users[] | null>([]);
  const [expanededUser, setExpandedUser] = useState<number | null>(null);

  
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
    <div>
      <Header onSearchUser={(username) => fetchFilteredUsers(username)} />
      <div className={styles.container}>
        <div className={styles.usersContainer}>
          {loadingUsers && (
            <div className={styles.loaderContainer}>
              <CircularProgress className="loader" />
            </div>
          )}
          {!loadingUsers && (
            <Grid container spacing={2}>
              {errorUsers && <h1>API Error!</h1>}
              {searchUser &&
                Array.isArray(searchUser) &&
                searchUser.length === 0 && <h1>No users found</h1>}
              {searchUser &&
                Array.isArray(searchUser) &&
                searchUser.map((element: Users, index: number) => {
                  return (
                    <Grid size={12} key={index}>
                      <Card
                        name={element.name}
                        email={element.email}
                        company={element.company.name}
                        id={element.id}
                        expandedUser={expanededUser}
                        setExpandedUser={(userId) => setExpandedUser(userId)}
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
