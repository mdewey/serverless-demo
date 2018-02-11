
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
                    <img src="/images/ben_frank.jpg" alt="Good Ol' Benny" height="100px"/>
                </section>
                <section>
                    Welcome to Be Like Ben, consectetur adipiscing elit. Integer sagittis dolor sed eros congue vulputate. Morbi eu velit gravida, ultrices ex vitae, pulvinar ligula. Integer non purus condimentum, euismod felis sit amet, hendrerit nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin eu justo tempor, semper nisl ac, ullamcorper diam. Fusce vel feugiat diam. Donec mattis tortor non lectus mattis vehicula. Curabitur a vulputate lectus, vel tempor est. Duis felis felis, suscipit in efficitur ut, ultrices dignissim tortor. Integer eget nunc non justo gravida laoreet. Aliquam dignissim euismod libero nec pharetra. Nulla facilisi.
                </section>
                <section>
                    <a href="#"  onClick={this.login.bind(this)}>Login</a>
                    <a href="/signup">Sign Up</a>
                </section>
            </div>
        )
    }
}
export default Home;