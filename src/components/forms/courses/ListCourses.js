import React, { Component } from 'react';
import CourseService from '../../services/CourseService';

import '../../styles/common.css';

class ListCourses extends Component {
    state = {
        courses: [],
        message: ''
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = _ => {
        CourseService.fetchCourses().then(response => {
            console.log(response.data);
            this.setState({ courses: response.data });
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div className="container top-view">
                <h4>All courses</h4>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Operation</th>
                                <th>Description</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.courses.map(course =>
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.username}</td>
                                    <td>{course.description}</td>
                                    {/* <td><button className="btn btn-error" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                    <td><button className="btn btn-error" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td> */}
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListCourses;