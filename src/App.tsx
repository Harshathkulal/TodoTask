import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";

const getLocalItems = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

function App() {
  const [data, setData] = useState(getLocalItems());
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [completed, setCompleted] = useState<boolean[]>(data.map(() => false));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
    setCompleted(data.map(() => false));
  }, [data]);

  const addTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input.trim()) {
      setData([...data, input]);
      setInput("");
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(data[index]);
  };

  const saveEdit = (index: number) => {
    const updatedTodos = data.map((todo: string, i: number) =>
      i === index ? editValue : todo
    );
    setData(updatedTodos);
    setEditIndex(null);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = data.filter((_: unknown, i: number) => i !== index);
    setData(updatedTodos);
  };

  const toggleComplete = (index: number) => {
    const updatedCompleted = completed.map((c, i) => (i === index ? !c : c));
    setCompleted(updatedCompleted);
  };

  return (
    <div>
      <header className="bg-black text-white py-4 px-6 shadow flex justify-center">
        <img src="/Task.svg" alt="" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Todo Tracker</h1>
      </header>

      <main className="flex-1 p-4 mt-2 space-y-4">
        <div className="flex items-center space-x-2">
          <form onSubmit={addTodo} className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Add a new todo..."
              className="flex-1 border-2 rounded text-sm font-medium px-4 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white rounded px-4 py-2 text-sm font-medium shadow-sm"
            >
              Add
            </button>
          </form>
        </div>

        <div className="space-y-2 lg:mx-8">
          {data.map((todo: string, index: number) => (
            <div key={index} className="flex items-center m-2 pt-4">
              <input
                type="checkbox"
                checked={completed[index]}
                onChange={() => toggleComplete(index)}
                className="mr-2 bg-black "
              />
              {editIndex === index ? (
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 border-2 rounded text-sm font-medium px-4 py-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(index)}
                    className="bg-black text-white rounded px-4 py-2 text-sm font-medium"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p
                    className={`flex-1 break-words text-sm font-medium ${
                      completed[index] ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo}
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(index)}>
                      <FiEdit />
                    </button>
                    <button onClick={() => deleteTodo(index)}>
                      <AiOutlineDelete />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
