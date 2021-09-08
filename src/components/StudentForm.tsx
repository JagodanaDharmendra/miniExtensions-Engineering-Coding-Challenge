import React, { Component } from 'react'

interface PropsType {
    onFormSubmit: (name: string) => void;
}

class StudentForm extends Component<PropsType> {
    render() {
        return (
            <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    name: { value: string }
                };
                const name = target.name.value;
                console.log(name);
                this.props.onFormSubmit(name);
            }} >
                Student Name : <input type="name" name="name" placeholder="Enter student name" />
                <button type='submit'>Login</button>
            </form >
        )
    }
}

export default StudentForm;