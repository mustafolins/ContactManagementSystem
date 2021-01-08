import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Contact from './Contact'

export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contacts: []
        }

        this.requestList = this.requestList.bind(this)
        this.recievedList = this.recievedList.bind(this)
    }

    componentDidMount() {
        // initial call
        this.requestList()
    }

    /**
     * Gets a list of contacts from the API.
     */
    requestList() {
        fetch('https://localhost:44374/contact/list')
            .then(response => response.json())
            .then(data => this.recievedList(data))
    }

    /**
     * Sets the state of contacts to the given data.
     * @param {*} data Array of contacts.
     */
    recievedList(data) {
        this.setState({
            contacts: data
        })
    }

    render() {
        return (
            <div>
                <Link to='/contact/add'>Add Contact</Link>
                {this.state.contacts.map((contact, i) => (
                    <Contact
                        key={i}
                        id={contact.id}
                        name={contact.name}
                        description={contact.description}
                        birthDate={contact.birthDate}
                        group={contact.group}
                        created={contact.created}
                        updated={contact.updated}
                        flag={contact.flag}
                    />
                ))}
            </div>
        )
    }
}
