import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, Box } from '@mui/material';
import { Todo } from '../../services/types';

interface TodoFormProps {
  onCreate: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  editingTodo: Todo | null;
  userId: number;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreate, onEdit, editingTodo, userId }) => {
  const [title, setTitle] = useState<string>(editingTodo?.title || '');
  const [description, setDescription] = useState<string>(editingTodo?.description || '');
  const [completed, setCompleted] = useState<boolean>(editingTodo?.completed || false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setCompleted(editingTodo.completed);
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    const todo: Todo = {
      id: editingTodo?.id || 0,
      title,
      description,
      completed,
      userId
    };

    if (editingTodo) {
      onEdit(todo);
    } else {
      onCreate(todo);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <Box display="flex" alignItems="center" mb={2}>
        <Checkbox
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span>Completed</span>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {editingTodo ? 'Update To-Do' : 'Add To-Do'}
      </Button>
    </Box>
  );
};

export default TodoForm;
