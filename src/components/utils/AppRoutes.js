import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import UserRegister from '../forms/UserRegister';
import UserLogin from '../forms/UserLogin';
import Dashboard from '../forms/Dashboard';
import UserReset from '../forms/UserReset';

class AppRoutes extends Component {
    render() {
        return (
            <Router>
                <>
                    <h3 style={{ textAlign: "center" }}>Admin application using React with Spring boot</h3>
                    <Switch>
                        <Route path="/" exact component={UserLogin} />
                        <Route path="/register" exact component={UserRegister} />
                        <Route path="/home" exact component={Dashboard} />
                        <Route path="/account-recovery" exact component={UserReset} />
                    </Switch>
                </>
            </Router>
        );
    }
}
export default AppRoutes;