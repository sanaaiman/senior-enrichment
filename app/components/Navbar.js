import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render () {
        return (
            <nav className="navbar">
                <Link className="btn btn-success" to="/students">Students</Link>
                <Link className="btn btn-success" to="/">Campus</Link>
                <img className="navImage" src="https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/way_out_there_1999858112.jpg"></img>
                <h1>School of Thoth</h1>
                <Link className="btn btn-info" to="/students/add">Add Student</Link>
                <h3>Look up to the skies...our schools are floating around the stars!</h3>
            </nav>
        )
    }
};