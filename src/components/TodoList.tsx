import React, { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [
    { id: 1, text: "Learn TypeScript", completed: false },
    { id: 2, text: "Build a React App", completed: false },
  ]);

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const [newTodoText, setNewTodoText] = useState("");

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <Input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
        />
        <Button
          onClick={() => {
            if (newTodoText.trim()) {
              addTodo(newTodoText);
              setNewTodoText("");
            }
          }}
          className="mt-3 bg-green-500 hover:bg-green-600"
        >
          Add Todo
        </Button>
      </div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <div>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleComplete(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <Button variant="destructive" onClick={() => removeTodo(todo.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
