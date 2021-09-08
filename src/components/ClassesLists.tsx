import React, { Component } from "react";
import AirtableHelper, { ClassType } from "../helpers/airtable";
import ClassItem from "./ClassItem";

interface PropsType {
  onLoggedOutClicked: () => void;
  name: string;
}

interface StatesType {
  isLoading: boolean;
  data: ClassType[] | null;
  error: string;
}

class ClassList extends Component<PropsType, StatesType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      error: "",
    };
  }

  componentDidMount() {
    const studentName = this.props.name;
    try {
      AirtableHelper.LoadDataUsingAPI(studentName).then(
        (nData: ClassType[]) => {
          this.setState({
            data: nData,
            isLoading: false,
            error: "",
          });
        }
      );
    } catch (e: any) {
      this.setState({
        data: null,
        isLoading: false,
        error: e,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button
              onClick={() => {
                this.props.onLoggedOutClicked();
              }}
            >
              Logout
            </button>

            <div>
              {this.state.data?.map((element) => {
                return (
                  <ClassItem
                    key={element.className}
                    className={element.className}
                    studentNames={element.studentNames}
                  />
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
}

export default ClassList;
