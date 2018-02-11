
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../auth/Auth.js';

const auth = new Auth();

class Home extends Component {

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }


    render() {
        const item = this.props.auth;
        console.log(this.props)
        return (
            <div className="main-content">
                <header>
                    <h2>Be Like Ben!</h2>
                    <h4>Not like that other guy..</h4>
                </header>
                <section>
                    This is how to Be Like Ben
                </section>
            </div>
        )
    }
}
export default Home;