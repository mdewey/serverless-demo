

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format'
import Auth from '../auth/Auth.js';

const auth = new Auth();
const BASE_URL = " https://ancg5rd6oi.execute-api.us-east-1.amazonaws.com/dev/"

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bens: [],
            virtues: [
                { title: "Temperance", id: 0, description: "Eat not to dullness. Drink not to elevation." },
                { title: "Silence", id: 1, description: "Speak not but what may benefit others or yourself. Avoid trifling conversation." },
                { title: "Order", id: 2, description: "Let all your things have their places. Let each part of your business have its time." },
                { title: "Resolution", id: 3, description: "Resolve to perform what you ought. Perform without fail what you resolve." },
                { title: "Frugality", id: 4, description: "Make no expense but to do good to others or yourself: i.e., Waste nothing." },
                { title: "Industry", id: 5, description: "Lose no time. Be always employed in something useful. Cut off all unnecessary actions." },
                { title: "Sincerity", id: 6, description: "Use no hurtful deceit. Think innocently and justly; and if you speak, speak accordingly." },
                { title: "Justice", id: 7, description: "Wrong none by doing injuries, or omitting the benefits that are your duty." },
                { title: "Moderation", id: 8, description: "Avoid extremes. Forbear resenting injuries so much as you think they deserve." },
                { title: "Cleanliness", id: 9, description: "Tolerate no uncleanness in body, clothes, or habitation." },
                { title: "Tranquility", id: 10, description: "Be not disturbed at trifles, or at accidents common or unavoidable." },
                { title: "Chastity", id: 11, description: "Rarely use venery but for health or offspring; never to dullness, weakness, or the injury of your own or another's peace or reputation." },
                { title: "Humility", id: 12, description: "Imitate Jesus and Socrates." },
            ]
        }
    }

    logout() {
        auth.logout();
    }

    componentDidMount() {
        const _url = BASE_URL.concat("all")
        fetch(_url, {
            method: "get",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("id_token")
            },
            // body: JSON.stringify(_data)
        }).then(resp => resp.json()).then(json => {
            console.log("back", json.data)
            this.setState(() => {
                return {
                    bens: json.data
                }
            })
        })
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
                    "Ben Points" are a system to help you track how many times you have acted in accordance with one of the 13 virtues.
                </section>
                <section>
                    <Link to={{
                        pathname: "/home"
                    }}>Back</Link>
                </section>
                <section className="report-ben-list">
                    <header>My Past Bens</header>
                    <section>
                        total bens: {this.state.bens.length}
                    </section>
                    <section>
                        {this.state.bens.map((ben, i) => {
                            return (<div key={i}>
                                <div>{this.state.virtues[ben.virtueId].title}</div>
                                <div>{format(ben.timestamp, "MMM D, YY")}</div>
                            </div>)
                        })}
                    </section>
                </section>
            </div>
        )
    }
}
export default Home;