import React, { Component } from 'react'
import SelectGroup from '../Groups/SelectGroup'

export default class Add extends Component {
    constructor(props) {
        super(props)

        this.setState({
            selectedGroup: null
        })

        this.sendAddRequest = this.sendAddRequest.bind(this)
        this.setSelectedOption = this.setSelectedOption.bind(this)
    }

    /**
     * Sends an add request using the input fields of this component.
     */
    sendAddRequest() {
        // gets the name, description, birth date, and flag
        var name = document.getElementById('name').value
        var description = document.getElementById('description').value
        var birthDate = document.getElementById('birthDate').value
        var flag = document.getElementById('flag').value

        // posts the contact data to the API.
        fetch('https://localhost:44374/contact/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "birthDate": birthDate,
                "group": parseInt(this.state.selectedGroup),
                "flag": flag
            })
        })

        window.location.href = '/'
    }

    /**
     * Sets the selectedGroup state to the given value.
     * @param {Number} value The id of the selected group.
     */
    setSelectedOption(value){
        this.setState({
            selectedGroup: value
        })
    }

    render() {
        return (
            <div>
                <label>Name:</label> <br />
                <input id='name' type="text" /> <br />
                <label>Description:</label> <br />
                <input id='description' type="text" /> <br />
                <label>Birth Date:</label> <br />
                <input id='birthDate' type="date" /> <br />
                <label>Group:</label> <br />
                {/* Pass the setSelectedOption function and selectedGroup state so everything can be updated properly. */}
                <SelectGroup sendChange={this.setSelectedOption} selected={this.state != null ? this.state.selectedGroup : -1}/> <br/>
                <label>Favorite Flag:</label> <br />
                <input id='flag' type="text" /> <br />
                <button onClick={this.sendAddRequest}>Add Contact</button>
            </div>
        )
    }
}
