import React from "react";
import "./App.css";
import Header from "./components/header/component";
import Item from "./components/list-item/component";
import Modal from "./components/modal/component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleted = this.onDeleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCorrect = this.onCorrect.bind(this);

    this.state = {
      todoList: JSON.parse(localStorage.getItem("todoList")) || [],
      showModal: false,
      value: "",
      currentId: "",
    };
  }

  onDeleted = (id) => {
    const { todoList } = this.state;
    const searchingIndex = todoList.findIndex((el) => el.id === id);
    const beforeIndex = todoList.slice(0, searchingIndex);
    const afterIndex = todoList.slice(searchingIndex + 1);
    const newTodoList = [...beforeIndex, ...afterIndex];
    this.setState({ todoList: newTodoList });
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { todoList } = this.state;
    const id = `${todoList.length}-${e.target.childNodes[0].value}`
    const itemTemplate = {
      content: e.target.childNodes[0].value,
      id,
    };
    const newTodoList = [...todoList, itemTemplate];
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    this.setState({ todoList: newTodoList });
    e.target.reset();
  };

  onCorrect = (id) => {
    const { todoList } = this.state;
    const searchingIndex = todoList.findIndex((el) => el.id === id);
    this.setState({ 
      showModal: !this.state.showModal,
      value: todoList[searchingIndex].content,
      currentId: searchingIndex,
     });
  };

  onSave = (e) => {
    e.preventDefault();
    const { todoList, currentId } = this.state;
    todoList[currentId].content = e.target.childNodes[0].value;    
    this.setState({ 
      showModal: !this.state.showModal,
      todoList,
    });
  };

  render() {
    const elements = this.state.todoList.map((item) => {
      return (
        <Item
          onDeleted={this.onDeleted}
          onCorrect={this.onCorrect}
          content={item.content}
          id={item.id}
          key={item.id}
        />
      );
    });

    return (
      <div className="site">
        <div className="container">
          <Header onSubmit={this.onSubmit} />
          <div className="main">
            {this.state.showModal && (
              <Modal onSave={this.onSave} value={this.state.value} />
            )}
            <div className="task-list-wrapper">{elements}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
