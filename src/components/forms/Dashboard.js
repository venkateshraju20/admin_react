import React, { Component } from 'react';
import ListCourses from './courses/ListCourses';

class Dashboard extends Component {

    render() {
        return (
            <div className="container">
                <ListCourses />
            </div>
        );
    }
}

export default Dashboard;