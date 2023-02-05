import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { item: "This is a default.", id: Math.random() },
  ]);
  const [tempTodo, setTempTodo] = useState({});
  const [edit, setEdit] = useState(false);
  const todoInputRef = useRef();
  const updateInputRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleTodoInput = (event) => {
    todoInputRef.current.value = event.target.value;
    setError(false);
  };

  const handleUpdateInput = (event) => {
    updateInputRef.current.value = event.target.value;
    setError(false);
  };

  const addTodo = () => {
    const todo = todoInputRef.current.value;
    if (todo === "") {
      setError(true);
      setErrorMessage("Please enter a to-do item.");
      return;
    }
    setTodos((prevTodos) => {
      return [...prevTodos, { item: todo, id: Math.random() }];
    });
    todoInputRef.current.value = null;
  };

  const deleteTodo = (todo) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => prevTodo.id !== todo.id);
    });
  };

  const openEdit = (todo) => {
    setEdit(true);
    setTempTodo(todo);
  };

  const updateTodo = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === tempTodo.id) {
          return {
            item: updateInputRef.current.value,
          };
        }
        return prevTodo;
      });
    });
    setEdit(false);
  };

  return (
    <div className="relative w-auto mx-auto p-10" style={{ width: "750px" }}>
      <h1 className="text-4xl text-center mb-10 font-semibold text-gray-700">
        Welcome to your To-Do List!
      </h1>
      <div class="flex justify-center w-full">
        <input
          className="block w-full border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter a to-do item"
          ref={todoInputRef}
          onChange={handleTodoInput}
        />
        <button
          onClick={addTodo}
          className=" hover:bg-slate-900 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg ml-3"
        >
          Add
        </button>
      </div>
      <div className="mt-5 mx-auto">
        {error && (
          <div
            className="bg-red-100 mb-3 text-center mx-auto border border-red-400 text-red-700 px-4 py-3 rounded relative w-72"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <h2 className="text-2xl text-center mb-3 text-gray-700">
          Your current to-do list
        </h2>
        <ul className="divide-y divide-gray-300">
          {todos?.length === 0 && (
            <li className=" flex justify-center items-center">
              <h4 className="text-gray-700 text-2xl">No to-do items.</h4>
            </li>
          )}
          {todos.map((item) => (
            <li
              key={item.id}
              className="py-4 flex justify-between items-center"
            >
              <h4 className="text-gray-700 text-2xl">{item.item}</h4>
              <div className="">
                <button
                  onClick={() => openEdit(item)}
                  className="hover:bg-slate-900 bg-slate-600 text-white font-bold py-2 px-4 mr-4 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item)}
                  className="hover:bg-slate-900 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {edit && (
          <div className=" flex justify-center items-center mt-3">
            <div className="bg-white w-1/3 h-1/3 rounded-lg flex flex-col justify-center items-center">
              <hr class=" mb-4 border-t border-gray-400 w-full"></hr>
              <h3 className="text-2xl text-center mb-3  text-gray-700">
                Edit to-do item
              </h3>
              <h3 className="text-2xl text-center mb-3  text-gray-700">
                {tempTodo.item}
              </h3>

              <div class="flex justify-center " style={{ width: "675px" }}>
                <input
                  className="block w-full border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Enter new to-do item"
                  ref={updateInputRef}
                  onChange={handleUpdateInput}
                />
                <button
                  onClick={updateTodo}
                  className=" hover:bg-slate-900 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg ml-3"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
