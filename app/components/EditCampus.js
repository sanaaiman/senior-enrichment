import React, { Component } from 'react';
//import axios from 'axios';

export default class EditCampus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            campusName: this.props.campusName
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            campusName: event.target.value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        axios.put(`/api/campuses/${this.props.campusId}`, {name: this.state.campusName})
        .then(res => res.data)
        .then(() => this.props.editMode())
    }
    
    render() {
        const campusName = this.props.campusName;
        return(
            <div className="editBody">
                <h3>Current Name: {campusName}</h3>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label for="inputName"></label>
                  <input
                    className="form-control"
                    placeholder="Please enter the new name for the campus!"
                    onChange={this.handleChange}
                  /><br />
                    <button
                    type="submit"
                    className="btn btn-success">
                    Update Name
                  </button>
                </form>
            </div>
        )
    }
}