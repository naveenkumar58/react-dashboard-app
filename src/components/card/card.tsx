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

interface CardProps {
  name: string;
  email: string;
  company: string;
  id: number;
}

const Card = (props: CardProps) => {
  const [posts, setPost] = useState<Post[]>([]);
  const [toDos, setTodo] = useState<Todo[]>([]);

  const userPosts = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${props.id}`
  );

  const usertoDos = useFetch<Todo[]>(
    `https://jsonplaceholder.typicode.com/todos?userId=${props.id}`
  );

  return (
    <div className="card">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label={props.name}>
                {props.name.charAt(0)}
              </Avatar>
            }
            title={props.name}
            subheader={props.email}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Word of the Day
            </Typography>
          </CardContent>
        </AccordionSummary>
        <AccordionDetails>
        <table id="customers">
  <tr>
    <th>Posts</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
  </tr>
  </table>
  <hr/>
  <table id="customers">
  <tr>
    <th>Todos</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>false</td>
  </tr>
  </table>
        </AccordionDetails>        
      </Accordion>
    </div>
  );
};

export default Card;
