import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Contact extends Component {
    constructor(props){
        super(props)

        this.setState({
            groupDescription: ''
        })

        this.sendDeleteRequest = this.sendDeleteRequest.bind(this)
        this.requestGroup = this.requestGroup.bind(this)
        this.recievedGroup = this.recievedGroup.bind(this)
    }

    componentDidMount(){
        this.requestGroup()
    }

    /**
     * Request the group information from the API for the group that is equal to the property group.
     */
    requestGroup() {
        fetch(`https://localhost:44374/group/${this.props.group}`)
            .then(response => response.json())
            .then(data => this.recievedGroup(data))
    }

    /**
     * Sets the state of the groupDescription to that of the given group data.
     * @param {*} data Recieved group data.
     */
    recievedGroup(data) {
        this.setState({
            groupDescription: data.title
        })
    }

    /**
     * Sends a delete request to the API for the current contact.
     */
    sendDeleteRequest(){
        fetch(`https://localhost:44374/Contact/delete?id=${this.props.id}`, {
            method: 'DELETE'
        })
    }

    render() {
        return (
            <div>
                <label>Id: {this.props.id}</label> <br/>
                <label>Name: {this.props.name}</label> <br/>
                <label>Description: </label> <br/>
                <div>{this.props.description}</div>
                <label>Birth Date: {this.props.birthDate}</label> <br/>
                <label>Group: {this.state ? this.state.groupDescription : ''}</label> <br/>
                <label>Favorite Flag: {this.props.flag}</label> <br/>
                <label>Created: {this.props.created}</label> <br/>
                <label>Updated: {this.props.updated}</label> <br/>
                {/* Link to an update page passing the appropriate state variables to populate the fileds */}
                <Link to={
                    {
                        pathname: '/contact/update',
                        state: {
                            id: this.props.id,
                            name: this.props.name,
                            description: this.props.description,
                            birthDate: this.props.birthDate,
                            group: this.props.group,
                            flag: this.props.flag
                        }
                    }
                    }
                >
                    Edit
                </Link>
                <em> </em>
                <a href='/' onClick={this.sendDeleteRequest}>Delete</a>
                <hr/>
            </div>
        )
    }
}
