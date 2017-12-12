import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class AddStudent extends Component {
    
    constructor() {
        super();
        this.state ={
            campuses: [],
            studentName: '',
            studentEmail: '',
            campusId: 1,
            redirectToHome: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get(`/api/campuses`)
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
        .catch(console.error)
    }
    
    handleChange(key) {
        return function(event) {
            let state = {};
            state[key] = event.target.value;
            this.setState(state);
        }.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`/api/students`, {
            name: this.state.studentName,
            email: this.state.studentEmail,
            campusId: this.state.campusId})
        .then(res => res.data)
        .then(() => this.setState({redirectToHome: true}))
    }
    
    render() {
        const campuses = this.state.campuses;
        const redirect = this.state.redirectToHome;
        return (
            <section className="editBody">
                { redirect && <Redirect to={`/campus/${this.state.campusId}`} />}
                <h1>Please enter the information for the new student!</h1>
                <h3>Note that all fields are required to create a new student</h3>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label for="inputName">Student Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter full name of the student"
                    onChange={this.handleChange('studentName')}
                  />
                    <label for="inputEmail">Student Email Address</label>
                  <input
                    className="form-control"
                    placeholder="Enter email address of the student"
                    onChange={this.handleChange('studentEmail')}
                  />
                    <label for="inputEmail">Select College for Student</label><br/>
                    {  campuses.length && 
                        <select onChange={this.handleChange('campusId')}>
                        {
                            campuses.map(campus => (
                                <option 
                                    key={campus.id} 
                                    value ={campus.id}>
                                    {campus.name}</option>
                            ))
                        }
                        </select>
                    }
                    <button
                    type="submit"
                    className="btn btn-primary">
                    Submit Student
                  </button>
                </form>
            </section>
        )
    }
}