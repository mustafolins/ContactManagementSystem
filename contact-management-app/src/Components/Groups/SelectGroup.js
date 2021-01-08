import React, { Component } from 'react'

export default class SelectGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: []
        }

        this.requestList = this.requestList.bind(this)
        this.recievedList = this.recievedList.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // initial call
        this.requestList()
    }

    /**
     * Requests a list of groups from the API.
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

    /**
     * Handler for sending the change to the parent component.
     */
    handleChange() {
        var e = document.getElementById("selection")
        // call passed in function to spawn any necessary actions on the parent component.
        this.props.sendChange(e.value)
    }

    render() {
        return (
            <select id="selection" onChange={this.handleChange} value={(this.props.selected != null) ? this.props.selected : '-1'}>
                <option value='-1' disabled hidden>Please select a group.</option>
                {
                    this.state.groups.map((group, i) => (
                        <option
                            key={i}
                            value={group.id}>
                            {group.title}
                        </option>
                    ))
                }
            </select>
        )
    }
}
