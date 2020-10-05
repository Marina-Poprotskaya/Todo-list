import React from "react";
import "./App.css";
import Header from "./components/header/component";
import Item from "./components/list-item/component";
import Modal from "./components/modal/component";

class App extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      todoList: this.getDefaultTodoList(),
      showModal: false,
      value: "",
      currentId: "",
    };
  }
  
  getDefaultTodoList = () => {
    return JSON.parse(localStorage.getItem("todoList")) || []
  }

  getCurrentSearchingIndex = (id) => {
    const { todoList } = this.state;
    const searchingIndex = todoList.findIndex((el) => el.id === id);

    return searchingIndex;
  }

  handleDelete = (id) => {
    const { todoList } = this.state;
    const searchingIndex = this.getCurrentSearchingIndex(id);
    const beforeIndex = todoList.slice(0, searchingIndex);
    const afterIndex = todoList.slice(searchingIndex + 1);
    const newTodoList = [...beforeIndex, ...afterIndex];
    this.setState({ todoList: newTodoList });
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  handleSubmit = (e) => {
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

  handleCorrect = (id) => {
    const { todoList } = this.state;
   const searchingIndex = this.getCurrentSearchingIndex(id);
    this.setState({ 
      showModal: !this.state.showModal,
      value: todoList[searchingIndex].content,
      currentId: searchingIndex,
     });
  };

  handleSave = (e) => {
    e.preventDefault();
    const { currentId } = this.state;
    const newContent = e.target.childNodes[0].value;
    this.setState((prevState) => {
      const newTodoList = prevState.todoList.map((el, index) => {

        return index === currentId ? {...el, content: newContent  } : el;

      })
      localStorage.setItem("todoList", JSON.stringify(newTodoList));

      return {
        todoList: newTodoList,
        showModal: !prevState.showModal,

      };
    });
  };

  handleUp = (id) => {
  const { todoList } = this.state;
  const searchingIndex = this.getCurrentSearchingIndex(id);
  if(searchingIndex === 0) return;
  const beforeIndex = todoList.slice(0, searchingIndex-1);
  const afterIndex = todoList.slice(searchingIndex + 1);
  const newTodoList = [...beforeIndex, todoList[searchingIndex], todoList[searchingIndex-1], ...afterIndex];
  this.setState({ 
    todoList: newTodoList
  });
  
  }

  handleDown = (id) => {
    const { todoList } = this.state;
    const searchingIndex = this.getCurrentSearchingIndex(id)
    if(searchingIndex === todoList.length-1) return;
    const beforeIndex = todoList.slice(0, searchingIndex);
    const afterIndex = todoList.slice(searchingIndex + 2);
    const newTodoList = [...beforeIndex, todoList[searchingIndex + 1], todoList[searchingIndex], ...afterIndex];
    this.setState({ 
    todoList: newTodoList
  });
  }

 renderTodoItems = () => {
    const elements = this.state.todoList.map((item) => {
      return (
        <Item
          onDelete={this.handleDelete}
          onCorrect={this.handleCorrect}
          onUp={this.handleUp}
          onDown={this.handleDown}
          content={item.content}
          id={item.id}
          key={item.id}
        />
      );
    });

    return elements;
  }

  render() {
    return (
      <div className="site">
        <div className="container">
          <Header onSubmit={this.handleSubmit} />
          <div className="main">
            {this.state.showModal && (
              <Modal onSave={this.handleSave} value={this.state.value} />
            )}
            <div className="task-list-wrapper">{this.renderTodoItems()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
