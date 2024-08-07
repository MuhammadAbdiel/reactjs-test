import React, { useState } from "react";
import TodoList from "./components/TodoList";
import SimpleForm from "./components/SimpleForm";
import { Button } from "./components/ui/button";

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<
    "todo" | "form" | null
  >("todo");

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose a Component</h1>
      <div className="mb-4">
        <Button
          disabled={selectedComponent === "todo"}
          onClick={() => setSelectedComponent("todo")}
          className="mr-2 bg-blue-500 hover:bg-blue-600"
        >
          Show TodoList
        </Button>
        <Button
          disabled={selectedComponent === "form"}
          onClick={() => setSelectedComponent("form")}
          className="bg-green-500 hover:bg-green-600"
        >
          Show SimpleForm
        </Button>
      </div>
      <div>
        {selectedComponent === "todo" && <TodoList />}
        {selectedComponent === "form" && <SimpleForm />}
      </div>
    </div>
  );
};

export default App;
