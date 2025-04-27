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

interface CardProps {
  name: string;
  email: string;
  company: string;
  id: number;
  posts?: Post[] | null;
  todos?: Todo[] | null;
  todosLoading?: boolean;
  postsLoading?: boolean;
  expanededUser?: number | null;
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
    expanededUser,
  } = props;

  return (
    <div className="card">
      <Accordion
        onChange={(_, expanded) => {
          onAccordionChange?.(id, expanded);
        }}
        expanded={expanededUser === id}
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
