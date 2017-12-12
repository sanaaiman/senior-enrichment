import React, { Component } from 'react';
//import axios from 'axios';

export default class AddCollege extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            inputName: event.target.value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.inputName;
        this.props.addCollege(name);
        this.setState({inputName: ''})
    }
    
    render() {
        return (
            <div>
              <form 
                  className="form-group formBottom"
                  onSubmit={this.handleSubmit}>
                    <label for="inputName" className="formName"></label>
                  <button
                    type="submit"
                    className="btn btn-success">
                    Add
                  </button>
                  <input
                    value={this.state.inputName}
                    className="form-control"
                    placeholder="Please type campus name herein if you wish to add to list of campuses. Press add button to the right to enter!"
                    onChange={this.handleChange}
                  />
                </form>
            </div>
        )
    }
}