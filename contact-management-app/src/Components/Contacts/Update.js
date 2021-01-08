import React, { Component } from 'react'
import SelectGroup from '../Groups/SelectGroup'

export default class Update extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            id: props.location.state.id,
            name: props.location.state.name,
            description: props.location.state.description, 
            birthDate: props.location.state.birthDate,
            selectedGroup: props.location.state.group,
            flag: props.location.state.flag
        }

        this.sendUpdateRequest = this.sendUpdateRequest.bind(this)
        this.setSelectedOption = this.setSelectedOption.bind(this)
    }

    /**
     * Sends the updated contact to the API.
     */
    sendUpdateRequest() {
        // get the user's input for name, description, birth date, and flag
        var name = document.getElementById('name').value
        var description = document.getElementById('description').value
        var birthDate = document.getElementById('birthDate').value
        var flag = document.getElementById('flag').value

        // put the update to the API.
        fetch('https://localhost:44374/contact/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.id,
                "name": name,
                "description": description,
                "birthDate": birthDate,
                "group": parseInt(this.state.selectedGroup),
                "flag": flag
            })
        })

        // redirect to contacts list page.
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
                <label>Id: {this.state.id}</label> <br/>
                <label>Name: </label> <br />
                <input id='name' type="text" defaultValue={this.state.name} /> <br />
                <label>Description:</label> <br />
                <input id='description' type="text" defaultValue={this.state.description} /> <br />
                <label>Birth Date: </label> <br />
                <input id='birthDate' type="date-time" defaultValue={this.state.birthDate} /> <br />
                <label>Group:</label> <br />
                {/* Pass the setSelectedOption function and selectedGroup state so everything can be updated properly. */}
                <SelectGroup sendChange={this.setSelectedOption} selected={this.state.selectedGroup}/> <br/>
                <label>Favorite Flag:</label> <br />
                <input id='flag' type="text" defaultValue={this.state.flag} /> <br />
                <button onClick={this.sendUpdateRequest}>Update Contact</button>
            </div>
        )
    }
}
