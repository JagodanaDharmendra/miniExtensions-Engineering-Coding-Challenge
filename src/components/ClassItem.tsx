import React, { Component } from 'react';
import AirtableHelper from '../helpers/airtable';

interface PropsType {
    onLoggedOutClicked: () => void,
    name: string
}

interface StatesType {
    isLoading: boolean,
    data: any,
    error: string
}

class ClassItem extends Component<PropsType, StatesType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            error: ''
        }
    }

    componentDidMount() {
        AirtableHelper.LoadStudentDataUsingAPI(this.props.name, (data: any) => {
            this.setState({
                data: data,
                isLoading: false,
                error: ''
            });
        });
    }

    render() {
        return (
            <>
                {this.state.isLoading
                    ? (<div>Loading...</div>)
                    : (<>
                        <div>{this.state.data}</div>
                        <button onClick={() => { this.props.onLoggedOutClicked(); }}>Logout</button>
                    </>)}

            </>
        )
    }
}

export default ClassItem;