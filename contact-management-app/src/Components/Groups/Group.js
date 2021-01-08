import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Group extends Component {
    constructor(props){
        super(props)

        this.sendDeleteRequest = this.sendDeleteRequest.bind(this)
    }

    /**
     * Sends a delete request for the current group.
     */
    sendDeleteRequest(){
        fetch(`https://localhost:44374/group/delete?id=${this.props.id}`, {
            method: 'DELETE'
        })
    }

    render() {
        return (
            <div>
                <label>Id: {this.props.id}</label> <br/>
                <label>Title: {this.props.title}</label> <br/>
                <label>Description: </label> <br/>
                <div>{this.props.description}</div>
                {/* Link to an update page passing the appropriate state variables to populate the fileds */}
                <Link to={
                    {
                        pathname: '/group/update',
                        state: {
                            id: this.props.id,
                            title: this.props.title,
                            description: this.props.description
                        }
                    }
                    }
                >
                    Edit
                </Link>
                <em> </em>
                <a href='/group/' onClick={this.sendDeleteRequest}>Delete</a>
                <hr/>
            </div>
        )
    }
}
