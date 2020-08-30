import { Button } from "@material-ui/core";
import React, { useState } from "react";
import uuid from "uuid";
import { gql, useMutation } from '@apollo/client';


const ADD_TODOS = gql`
mutation AddTodo($task: String!) {
  createTask(item: $task){
    task {
      item completed
    }
  }
}
`;



function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false
  });
  const [addTodoToDB, data] = useMutation(ADD_TODOS);
  // console.log(data)

  function handleTaskInputChange(e) {
    //sending reqest  to   server  on  every keystroke. Look for user to press enter
      setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (todo.task.trim()) {
     addTodo({ ...todo, id: uuid.v4() });
     addTodoToDB({variables: { task: todo.task } });

     setTodo({ ...todo, task: "" });
    }
  }

  

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        label="Task"
        type="text"
        name="task"
        value={todo.task}
        onChange={handleTaskInputChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default TodoForm;
