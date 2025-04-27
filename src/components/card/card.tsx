import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardHeader, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import Post from "../../models/Post";
import Todo from "../../models/Todo";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import "./card.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

interface CardProps {
  name: string;
  email: string;
  company: string;
  id: number;
  expandedUser: number | null;
  setExpandedUser: (userId: number | null) => void;
}

const API_URL = "https://jsonplaceholder.typicode.com/";

const Card = (props: CardProps) => {
  const { name, email, company, id, setExpandedUser, expandedUser } = props;

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

  const fetchPostsAndTodos = (expanded: boolean, userId: number) => {
    if (expanded) {
      fetchUserPosts(`${API_URL}posts?userId=${userId}`);
      fetchUserTodos(`${API_URL}todos?userId=${userId}`);
      setExpandedUser(userId);
    } else {
      setExpandedUser(null);
    }
  };

  return (
    <div className="card">
      <Accordion
        onChange={(_, expanded) => {
          fetchPostsAndTodos(expanded, id);
        }}
        expanded={expandedUser === id}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="user-content"
          id="user-header"
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label={name}>
                {name.charAt(0)}
              </Avatar>
            }
            title={name}
            subheader={
              <div className="card-subheader">
                <span>{email}</span>
                <span>{company}</span>
              </div>
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          <div className="tableContainer">
            {loadingUserPosts && <CircularProgress />}
            {!loadingUserPosts && userPosts && Array.isArray(userPosts) && (
              <table className="cardTable">
                <tr>
                  <th>Posts</th>
                </tr>

                {userPosts.map((element: Post) => {
                  return (
                    <tr>
                      <td>{element.title}</td>
                    </tr>
                  );
                })}
              </table>
            )}
            {loadingUserTodos && <CircularProgress />}
            {!loadingUserTodos && userTodos && Array.isArray(userTodos) && (
              <table id="customers">
                <tr>
                  <th>Todos</th>
                  <th>Status</th>
                </tr>

                {userTodos.map((element: Todo) => {
                  return (
                    <tr>
                      <td>{element.title}</td>
                      <td>
                        {element.completed ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </table>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Card;
