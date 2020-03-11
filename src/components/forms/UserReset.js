import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from '../services/UserService';

class UserReset extends Component {
    state = {
        email: ''
    }

    validate(values) {
        let errors = {};

        if (!values.email) {
            errors.email = 'Enter email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    }

    onSubmit = values => {
        console.log(values);

        let user = {
            email: values.email
        }

        UserService.loginUser(user).then(response => {
            console.log(response.data);
            this.props.history.push('/home');
        }).catch((e) => console.log(e));
    }

    onLoginUser = _ => {
        this.props.history.push('/');
    }

    render() {
        let { email, password } = this.state;

        return (
            <div className="container col-md-6 col-md-offset-4 top-view">
                <h4 style={{ textAlign: "center" }}>Acount recovery</h4>
                <Formik
                    initialValues={{ email, password }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}

                >
                    {(props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="text" name="email" />
                            </fieldset>
                            <ErrorMessage name="email" component="div" className="alert alert-danger" />
                            <button className="btn btn-primary" type="submit">Submit</button>
                            <button className="button-right link-button" type="submit" onClick={() => this.onLoginUser()}>Log in instead</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default UserReset;