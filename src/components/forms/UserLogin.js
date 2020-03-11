import React, { Component } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import UserService from '../services/UserService';

import '../styles/common.css';

class UserLogin extends Component {

    state = {
        email: '',
        password: ''
    }

    validate(values) {
        let errors = {};

        if (!values.email) {
            errors.email = 'Enter email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Enter password';
        }
        return errors
    }

    onSubmit = values => {
        console.log(values);

        let user = {
            email: values.email,
            password: values.password,
        }

        UserService.loginUser(user).then(response => {
            console.log(response.data);
            this.props.history.push('/home');
        }).catch((e) => console.log(e));
    }

    onCreateUser = _ => {
        this.props.history.push('/register');
    }

    onResetPassword = _ => {
        this.props.history.push('/account-recovery');
    }

    render() {
        let { email, password } = this.state;

        return (
            <div className="container col-md-6 col-md-offset-4 top-view">
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
                            <fieldset className="form-group">
                                <label>Password</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>
                            <ErrorMessage name="password" component="div" className="alert alert-danger" />
                            <button className="btn btn-primary" type="submit">Log in</button>
                            <button className="button-right link-button" type="submit" onClick={() => this.onCreateUser()}>Create user</button>
                            <fieldset className="form-group">
                                <button className="link-button" type="submit" onClick={() => this.onResetPassword()}>Forgot log in?</button>
                            </fieldset>

                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default UserLogin;