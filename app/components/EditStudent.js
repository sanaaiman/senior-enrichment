import React, { Component } from 'react';
import { Redirect } from 'react-router'
//import axios from 'axios';

export default class EditStudent extends Component {
    
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            campusId: 1,
            campuses: [],
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        const studentId = this.props.match.params.studentId;
        axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(studentInfo => 
              this.setState({
                    name: studentInfo.name,
                    email: studentInfo.email,
                    campusId: studentInfo.campusId
                }))
        .then(() => axios.get(`/api/campuses`))
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
    }
    
    handleChange(key) {
        return function(event) {
            let state = {};
            state[key] = event.target.value;
            this.setState(state);
        }.bind(this);
    }
    
    handleSubmit(event) {
        console.log('I AM CLICKED')
        const studentId = this.props.match.params.studentId;
        event.preventDefault();
        axios.put(`/api/students/${this.props.match.params.studentId}`, {
            name: this.state.name,
            email: this.state.email,
            campusId: this.state.campusId
        })
        .then(res => res.data)
        .then(() => this.setState({redirect: true}))
        
    }
    
    render() {
        const student = this.state;
        const redirect = this.state.redirect;
        const campuses = this.state.campuses;
        return (
            <section className="editBody">
                { redirect && <Redirect to={`/campus/${this.state.campusId}`}/>}
                <h1>Welcome to the rodeo</h1>
                <h4>Please update the current student below and hit submit</h4>
                {
                    student.name.length && 
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label for="inputName">Student Name</label>
                      <input
                        className="form-control"
                        value={student.name}
                        onChange={this.handleChange('name')}
                      />
                        <label for="inputEmail">Student Email Address</label>
                      <input
                        className="form-control"
                        value={student.email}
                        onChange={this.handleChange('email')}
                      />
                        <label for="inputEmail">Select New Campus for Student</label><br/>
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
                        className="btn btn-success">
                        Submit Update Student Information
                      </button>
                    </form>
                }
            </section>
        )
    }
}