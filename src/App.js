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
    this.onDown = this.onDown.bind(this);
    this.onUp = this.onUp.bind(this);
    this.getCurrentSearchingIndex = this.getCurrentSearchingIndex.bind(this);

    this.state = {
      todoList: JSON.parse(localStorage.getItem("todoList")) || [],
      showModal: false,
      value: "",
      currentId: "",
    };
  }

  getCurrentSearchingIndex = (id) => {
    const { todoList } = this.state;
    const searchingIndex = todoList.findIndex((el) => el.id === id);
    return searchingIndex;
  }

  onDeleted = (id) => {
    const { todoList } = this.state;
    const searchingIndex = this.getCurrentSearchingIndex(id);
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
    e.target.childNodes[0].focus()
    e.target.reset();
  };

  onCorrect = (id) => {
    const { todoList } = this.state;
   const searchingIndex = this.getCurrentSearchingIndex(id);
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

  onUp = (id) => {
  const searchingIndex = this.getCurrentSearchingIndex(id);
  if(searchingIndex === 0) return;
  console.log('up', id);
  }

  onDown = (id) => {
    const { todoList } = this.state;
    const searchingIndex = this.getCurrentSearchingIndex(id)
    if(searchingIndex === todoList.length-1) return;
    console.log('down', id);
  }

  render() {
    const elements = this.state.todoList.map((item) => {
      return (
        <Item
          onDeleted={this.onDeleted}
          onCorrect={this.onCorrect}
          onUp={this.onUp}
          onDown={this.onDown}
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
