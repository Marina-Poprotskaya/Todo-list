import React from "react";
import "./style.css";

class Modal extends React.Component {

  render() {
    return (
      <div className="modal-wrapper">
        <form className="modal-form" onSubmit={this.props.onSave}>
          <input id="modal-input" type="text" className="form-input" required defaultValue={this.props.value}/>
          <button type="submit" className="form-button">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Modal;
