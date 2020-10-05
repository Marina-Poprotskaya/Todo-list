import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/component";
import Item from "./components/list-item/component";
import Modal from "./components/modal/component";

function App() {
  const getDefaultTodoList = () => {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  };

  const [todoList, setTodoList] = useState(getDefaultTodoList());
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("");
  const [currentId, setCurrentId] = useState("");

  const getCurrentSearchingIndex = (id) => {
    const searchingIndex = todoList.findIndex((el) => el.id === id);

    return searchingIndex;
  };

  const handleDelete = (id) => {
    const searchingIndex = getCurrentSearchingIndex(id);
    const beforeIndex = todoList.slice(0, searchingIndex);
    const afterIndex = todoList.slice(searchingIndex + 1);
    const newTodoList = [...beforeIndex, ...afterIndex];
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `${todoList.length}-${e.target.childNodes[0].value}`;
    const itemTemplate = {
      content: e.target.childNodes[0].value,
      id,
    };
    const newTodoList = [...todoList, itemTemplate];
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    e.target.childNodes[0].focus();
    e.target.reset();
  };

  const handleCorrect = (id) => {
    const searchingIndex = getCurrentSearchingIndex(id);
    setShowModal(true);
    setValue(todoList[searchingIndex].content);
    setCurrentId(searchingIndex);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newContent = e.target.childNodes[0].value;
    setTodoList((prevState) => {
      const newTodoList = prevState.map((el, index) => {
        return index === currentId ? { ...el, content: newContent } : el;
      });
      return newTodoList;
    });

    setTodoList((prevToDo) => {
      const newTodoList = prevToDo.map((el, index) => {
        return index === currentId ? { ...el, content: newContent } : el;
      });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });

    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleUp = (id) => {
    const searchingIndex = getCurrentSearchingIndex(id);
    if (searchingIndex === 0) return;
    const beforeIndex = todoList.slice(0, searchingIndex - 1);
    const afterIndex = todoList.slice(searchingIndex + 1);
    const newTodoList = [
      ...beforeIndex,
      todoList[searchingIndex],
      todoList[searchingIndex - 1],
      ...afterIndex,
    ];
    setTodoList(newTodoList);
  };

  const handleDown = (id) => {
    const searchingIndex = getCurrentSearchingIndex(id);
    if (searchingIndex === todoList.length - 1) return;
    const beforeIndex = todoList.slice(0, searchingIndex);
    const afterIndex = todoList.slice(searchingIndex + 2);
    const newTodoList = [
      ...beforeIndex,
      todoList[searchingIndex + 1],
      todoList[searchingIndex],
      ...afterIndex,
    ];
    setTodoList(newTodoList);
  };

  const renderTodoItems = () => {
    const elements = todoList.map((item) => {
      return (
        <Item
          onDelete={handleDelete}
          onCorrect={handleCorrect}
          onUp={handleUp}
          onDown={handleDown}
          content={item.content}
          id={item.id}
          key={item.id}
        />
      );
    });

    return elements;
  };

  return (
    <div className="site">
      <div className="container">
        <Header onSubmit={handleSubmit} />
        <div className="main">
          {showModal && <Modal onSave={handleSave} value={value} />}
          <div className="task-list-wrapper">{renderTodoItems()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
