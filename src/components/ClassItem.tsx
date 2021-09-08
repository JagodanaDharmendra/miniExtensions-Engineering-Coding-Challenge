import { Component } from "react";
import { ClassType } from "../helpers/airtable";

class ClassItem extends Component<ClassType> {
  render() {
    return (
      <div>
        <hr />
        <h3>{this.props.className}</h3>
        <ul>
          {this.props.studentNames.map((nValue) => {
            return <li key={nValue}>{nValue}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ClassItem;
