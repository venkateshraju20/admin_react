import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from '../services/UserService';

import '../styles/common.css';

class UserRegister extends Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        mobile: "",
        profession: "",
    }

    async componentDidMount() {
        let response = await UserService.fetchUsers();
        console.log(response.data);
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
        } else if (values.description.length < 6) {
            errors.password = 'Enter atleast 6 Characters';
        }

        if (!values.firstName) {
            errors.firstName = 'Enter first name';
        } else if (values.firstName.length < 3) {
            errors.firstName = 'Must be atleast 3 characters or more';
        }

        if (!values.lastName) {
            errors.lastName = 'Enter last name';
        } else if (values.lastName.length < 3) {
            errors.lastName = 'Must be atleast 3 characters or more';
        }

        if (!values.mobile) {
            errors.mobile = 'Enter mobile number';
        } else if (values.mobile.length < 10 && values.mobile.length > 10) {
            errors.mobile = 'Must be exactly 10 digits';
        }

        if (!values.profession) {
            errors.profession = 'Enter profession';
        }

        return errors
    }

    async onSubmit(values) {
        console.log(values);

        let user = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
            profession: values.profession,
        }

        try {
            let response = await UserService.createUser(user);
            if (response.status === 200) {
                console.log(response.data);
                this.props.history.push('/');
            }
        } catch (e) {
            console.log(e.response);
        }

    }

    onLoginUser = _ => {
        this.props.history.push('/');
    }

    render() {
        let { email, password, confirmPassword, firstName, lastName, mobile, profession } = this.state;
        return (
            <div className="container col-md-6 col-md-offset-4 top-view">
                <h4 style={{ textAlign: "center" }}>Create account</h4>
                <Formik
                    initialValues={{ email, password, confirmPassword, firstName, lastName, mobile, profession }}
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
                                <Field className="form-control" type="email" name="email" />
                            </fieldset>
                            <ErrorMessage name="email" component="div" />
                            <fieldset className="form-group">
                                <label>Password</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>
                            <ErrorMessage name="password" component="div" />
                            <fieldset className="form-group">
                                <label>Confirm Password</label>
                                <Field className="form-control" type="password" name="confirmPassword" />
                            </fieldset>
                            <ErrorMessage name="confirmPassword" component="div" />
                            <fieldset className="form-group">
                                <label>First Name</label>
                                <Field className="form-control" type="text" name="firstName" />
                            </fieldset>
                            <ErrorMessage name="firstName" component="div" />
                            <fieldset className="form-group">
                                <label>Last Name</label>
                                <Field className="form-control" type="text" name="lastName" />
                            </fieldset>
                            <ErrorMessage name="lastName" component="div" />
                            <fieldset className="form-group">
                                <label>Mobile</label>
                                <Field className="form-control" type="text" name="mobile" />
                            </fieldset>
                            <ErrorMessage name="mobile" component="div" />
                            <fieldset className="form-group">
                                <label>Profession</label>
                                <Field className="form-control" type="text" name="profession" />
                            </fieldset>
                            <ErrorMessage name="profession" component="div" />
                            <button className="btn btn-primary" type="submit">Create</button>
                            <button className="button-right link-button" type="submit" onClick={() => this.onLoginUser()}>Log in instead</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default UserRegister;