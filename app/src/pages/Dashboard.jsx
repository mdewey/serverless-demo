
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../auth/Auth.js';

const BASE_URL = " https://ancg5rd6oi.execute-api.us-east-1.amazonaws.com/dev/"


const auth = new Auth();

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            benPoints:0,
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

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }

    noClicked(e, virtue) {
        console.log("clicked no for", { virtue })
        const _url = BASE_URL.concat("virtue/", virtue.id, "/no")
        fetch(_url, {
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("id_token")
            },
            // body: JSON.stringify(_data)
        }).then(resp => resp.json()).then(data => {
            console.log("back", { data })
        })
    }

    yesClicked(e, virtue) {
        console.log("clicked yes for", { virtue })
        console.log("clicked no for", { virtue })
        const _url = BASE_URL.concat("virtue/", virtue.id, "/yes")
        fetch(_url, {
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("id_token")
            },
            // body: JSON.stringify(_data)
        }).then(resp => resp.json()).then(data => {
            console.log("back", { data })
        })
    }

    componentDidMount() {
        const _url = BASE_URL.concat("getorcreate")
        fetch(_url, {
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("id_token")
            },
            // body: JSON.stringify(_data)
        }).then(resp => resp.json()).then(data => {
            console.log("back", { data })
            this.setState(() => {
                return {
                    benPoints: data.data.count.benPoints
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
                    You have {this.state.benPoints} Benjamins.
                    <a href="/ben-points">What?</a>
                </section>
                <section className="virtues-container">
                    {this.state.virtues.map((virtue, i) => {
                        return (<div key={i}>
                            <div className="virtue-description">
                                <div>{virtue.title}</div>
                                <div>{virtue.description}</div>
                            </div>
                            <div className="yes-no-buttons">
                                <button onClick={evt => this.noClicked(evt, virtue)}>No</button>
                                <button onClick={evt => this.yesClicked(evt, virtue)}>Yes</button>
                            </div>
                        </div>)
                    })}
                </section>
            </div>
        )
    }
}
export default Home;