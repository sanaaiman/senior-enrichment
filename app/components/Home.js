import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import AddCampus from './AddCampus.js';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            campuses: []
        }
        this.removeCollege = this.removeCollege.bind(this);
        this.addCollege = this.addCollege.bind(this);
    }
    
    componentDidMount() {
        axios.get(`/api/campuses`)
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
    }
    
    removeCampus(event) {
        const campusId = event;
        axios.delete(`/api/campuses/${campusId}`)
        .then(() => axios.get(`/api/campuses`))
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
        .catch(console.error)
    }
    
    addCampus(name) {
        axios.post(`/api/campuses`, { name })
        .then(res => res.data)
        .then(newCampus => {
            this.setState({
                campuses: [...this.state.campuses, newCampus]
            })
        })
    }
    
    render() {
        const campuses = this.state.campuses;
        return (
            <section>
                <div  className="campusList">
                {
                    campuses.length && campuses.map(campus => (
                        <div className="col-xs-2 studentBody subBody" key={campus.id}>
                            <h4><Link to={`/campus/${campus.id}`}>{campus.name}</Link></h4>
                            <img src={campus.image} />
                            <button className="btn btn-danger" onClick={() => this.removeCampus(campus.id)}>Remove Campus?</button>
                        </div>
                        )
                    )
                }
                </div>
                <AddCollege addCampus={this.addCampus}/>
            </section>
        )
    }
}