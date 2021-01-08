import React, { Component } from 'react'

export default class AddGroup extends Component {
    constructor(props) {
        super(props)

        this.sendAddRequest = this.sendAddRequest.bind(this)
    }

    /**
     * Sends an add group request to the API.
     */
    sendAddRequest() {
        // get user's title and description for group
        var title = document.getElementById('title').value
        var description = document.getElementById('description').value

        fetch('https://localhost:44374/group/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": title,
                "description": description
            })
        })

        // auto redirect to the ListGroup page.
        window.location.href = '/group/'
    }

    render() {
        return (
            <div>
                <label>Title:</label> <br />
                <input id='title' type="text" /> <br />
                <label>Description:</label> <br />
                <input id='description' type="text" /> <br />
                <button onClick={this.sendAddRequest}>Add Group</button>
            </div>
        )
    }
}
