import React from "react";
import "./style.css";

class Item extends React.Component {

render() {
    return (
          <div className="list-item" >
            <div className="content">{this.props.content}</div>
            <div className="buttons-wrapper">
              <button className="btn up"></button>
              <button className="btn down"></button>
              <button onClick={() => this.props.onCorrect(this.props.id)} className="btn fix"></button>
              <button onClick={() => this.props.onDeleted(this.props.id)} className="btn del"></button>
            </div>
          </div>
    );
}
}

export default Item;
