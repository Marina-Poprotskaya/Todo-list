import React from "react";
import Form from "../form/component";
import "./style.css";

function Header(props) {
  return (
    <div className="header">
      <Form onSubmit={props.onSubmit} />
    </div>
  );
}

export default Header;
