import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from '../../services/types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  return (
    <ListItem key={todo.id} divider>
      <ListItemText
        primary={todo.title}
        secondary={`${todo.description} - Completed: ${todo.completed ? 'Yes' : 'No'}`}
      />
      <IconButton onClick={() => onEdit()}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
