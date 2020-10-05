import React from "react";
import "./style.css";

function Item(props) {
  const handleUp = () => {
    props.onUp(props.id);
  };

  const handleDown = () => {
    props.onDown(props.id);
  };

  const handleCorrect = () => {
    props.onCorrect(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="list-item">
      <div className="content">{props.content}</div>
      <div className="buttons-wrapper">
        <button onClick={handleUp} className="btn up"></button>
        <button onClick={handleDown} className="btn down"></button>
        <button onClick={handleCorrect} className="btn fix"></button>
        <button onClick={handleDelete} className="btn del"></button>
      </div>
    </div>
  );
}

export default Item;
