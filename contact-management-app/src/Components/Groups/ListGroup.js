import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Group from './Group'

export default class ListGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: []
        }

        this.requestList = this.requestList.bind(this)
        this.recievedList = this.recievedList.bind(this)
    }

    componentDidMount() {
        // initial call
        this.requestList()
    }

    /**
     * Request a list of groups from the API.
     */
    requestList() {
        fetch('https://localhost:44374/group/list')
            .then(response => response.json())
            .then(data => this.recievedList(data))
    }

    /**
     * Sets the state of the groups array to the given data.
     * @param {*} data Array of groups.
     */
    recievedList(data) {
        this.setState({
            groups: data
        })
    }

    render() {
        return (
            <div>
                <Link to='/group/add'>Add Group</Link>
                {/* Map each group in groups to a Group object. */}
                {this.state.groups.map((group, i) => (
                    <Group
                        key={i}
                        id={group.id}
                        title={group.title}
                        description={group.description}
                    />
                ))}
            </div>
        )
    }
}
