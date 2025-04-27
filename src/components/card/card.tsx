import "./card.css";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardHeader, Avatar, IconButton, CardContent } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import Post from "../../models/Post";
import Todo from "../../models/Todo";
import useFetch from "../../hooks/useFetch";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import ApartmentIcon from "@mui/icons-material/Apartment";

interface CardProps {
  name: string;
  email: string;
  company: string;
  id: number;
  posts?: Post[] | null;
  todos?: Todo[] | null;
  todosLoading?: boolean;
  postsLoading?: boolean;
  onAccordionChange?: (userId: number, expanded: boolean) => void;
}

const Card = (props: CardProps) => {
  const {
    name,
    email,
    company,
    id,
    posts,
    todos,
    onAccordionChange,
    postsLoading,
    todosLoading,
  } = props;

  return (
    <div className="card">
      <Accordion
        onChange={(_, expanded) => {
          onAccordionChange?.(id, expanded);
        }}
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
          {postsLoading && <CircularProgress />}
          {!postsLoading && posts && Array.isArray(posts) && (
            <table id="customers">
              <tr>
                <th>Posts</th>
              </tr>

              {posts.map((element: Post) => {
                return (
                  <tr>
                    <td>{element.title}</td>
                  </tr>
                );
              })}
            </table>
          )}
          <hr />
          {todosLoading && <CircularProgress />}
          {!todosLoading && todos && Array.isArray(todos) && (
            <table id="customers">
              <tr>
                <th>Todos</th>
                <th>Status</th>
              </tr>

              {todos.map((element: Todo) => {
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Card;
