import React, { Component } from 'react'

export default class UpdateGroup extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            id: props.location.state.id,
            title: props.location.state.title,
            description: props.location.state.description,
        }

        this.sendUpdateRequest = this.sendUpdateRequest.bind(this)
    }

    /**
     * Sends the updated group to the API.
     */
    sendUpdateRequest() {
        // get the user's input title and description.
        var title = document.getElementById('title').value
        var description = document.getElementById('description').value

        // put the updated group to the API.
        fetch('https://localhost:44374/group/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.id,
                "title": title,
                "description": description
            })
        })

        // redirect to ListGroup page
        window.location.href = '/group/'
    }

    render() {
        return (
            <div>
                <label>Id: {this.state.id}</label> <br/>
                <label>Title:</label> <br />
                <input id='title' type="text" defaultValue={this.state.title} /> <br />
                <label>Description:</label> <br />
                <input id='description' type="text" defaultValue={this.state.description} /> <br />
                <button onClick={this.sendUpdateRequest}>Update Group</button>
            </div>
        )
    }
}
