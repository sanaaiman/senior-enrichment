import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleStudent extends Component {
    
    constructor() {
        super();
        this.state = {
            studentInfo: {}
        }
    }
    
    componentDidMount() {
        const studentId = this.props.match.params.studentId;
        
        axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(studentInfo => this.setState({ studentInfo }))
    }
    
    render() {
        const studentInfo = this.state.studentInfo;

        return (
            <section className="container">
                {studentInfo.campus && 
                    <div className="studentBody">
                         <h1  style={{margin: '10px 0 15px 0'}}> Welcome to student page for</h1><h1>{studentInfo.name}</h1>
                         <h3> This student studies at 
                             <Link to={`/campus/${studentInfo.campus.id}`}> {studentInfo.campus.name}</Link></h3>
                         <h3> The email address for the student is {studentInfo.email}</h3>
                         <h3> The student was addmitted to our Academy on {studentInfo.createdAt.slice(0,10)} and has been studying at the current school since {
                                 (studentInfo.createdAt.slice(0,10) === studentInfo.updatedAt.slice(0,10) ) 
                                 ? 
                                     <h3 style={{display: 'inline'}}>then</h3>
                                 :
                                     <h3  style={{display: 'inline'}}>{studentInfo.updatedAt.slice(0,10)}</h3>
                                 }
                         </h3>
                        
                        <div className="editBody" id="editStudent">
                            <h1>Please press edit to update student information: 
                                <button type="button" className="btn btn-success"><Link to={`/student/edit/${studentInfo.id}`}>Edit</Link></button>
                            </h1>
                        </div>       
                    </div>
                }
            </section>
        )        
    }
}