import React, { Component } from "react";
import "./style.css";

export default class App extends Component {
  constructor() {
    super();
    this.input = React.createRef();
  }
  state = {
    active: false
  };
  doubleClickHandler = () => {
    this.setState(
      {
        active: true
      },
      () => {
        this.input.current.focus();
      }
    );
  };
  blurHandle = () => {
    this.setState({
      active: false
    });
  };
  changeHandle = e => {
    this.props.change(e);
  };
  render() {
    const { active } = this.state;
    const { value } = this.props;
    if (active) {
      return (
        <input
          value={value}
          onChange={this.changeHandle}
          ref={this.input}
          className="adress-item-input"
          onBlur={this.blurHandle}
        />
      );
    }
    return (
      <span
        className="label-placeHolder"
        onDoubleClick={this.doubleClickHandler}
      >
        {value}
      </span>
    );
  }
}
