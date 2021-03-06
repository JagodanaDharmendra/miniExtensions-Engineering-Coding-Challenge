import React, { Component } from "react";
import "./App.css";
import ClassList from "./components/ClassesLists";
import StudentForm from "./components/StudentForm";

interface MyProps {}

interface MyState {
  loggedIn: boolean;
  studentName: string;
}

class App extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      loggedIn: false,
      studentName: "",
    };
  }

  onFormSubmit = (name: string) => {
    this.setState({
      loggedIn: true,
      studentName: name,
    });
  };

  onLoggedOut = () => {
    this.setState({
      loggedIn: false,
      studentName: "",
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn ? (
          <StudentForm onFormSubmit={this.onFormSubmit} />
        ) : (
          <ClassList
            name={this.state.studentName}
            onLoggedOutClicked={this.onLoggedOut}
          ></ClassList>
        )}
      </div>
    );
  }
}

export default App;
