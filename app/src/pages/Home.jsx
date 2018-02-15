
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
                <header className="home-header">
                    <h2>Be Like Ben!</h2>
                    <h4>Not like that other guy..</h4>
                </header>
                <section className="home-hero">
                    <img src="/images/ben_frank.jpg" alt="Good Ol' Benny" height="100px"/>
                </section>
                <section className="home-text">
                    Welcome to Be Like Ben! This is a self improvement app that will help guide you to follow Benjamin Franklin 13 Virtue. Through daily reminders and nudges, and logging your behavior, this will help make you more aware of you actions and make you act more like one of the defining man in history. 
                </section>
                <section className="home-links">
                    <a href="#"  onClick={this.login.bind(this)}>Get Started</a>
                </section>
            </div>
        )
    }
}
export default Home;