import React from "react";
import "./style.css";

class Item extends React.Component {
  handleUp = () => {
    this.props.onUp(this.props.id);
  };

  handleDown = () => {
    this.props.onDown(this.props.id);
  };

  handleCorrect = () => {
    this.props.onCorrect(this.props.id);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    return (
      <div className="list-item">
        <div className="content">{this.props.content}</div>
        <div className="buttons-wrapper">
          <button onClick={this.handleUp} className="btn up"></button>
          <button onClick={this.handleDown} className="btn down"></button>
          <button onClick={this.handleCorrect} className="btn fix"></button>
          <button onClick={this.handleDelete} className="btn del"></button>
        </div>
      </div>
    );
  }
}

export default Item;
