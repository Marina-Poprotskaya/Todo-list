import React from "react";
import "./style.css";

function Modal(props) {

    return (
      <div className="modal-wrapper">
        <form className="modal-form" onSubmit={props.onSave}>
          <input id="modal-input" type="text" className="form-input" required defaultValue={props.value}/>
          <button type="submit" className="form-button">
            Save
          </button>
        </form>
      </div>
    );
}

export default Modal;
