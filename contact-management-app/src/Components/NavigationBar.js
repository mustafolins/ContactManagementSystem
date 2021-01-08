import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Link to='/'>Contacts</Link>
                <label> | </label>
                <Link to='/group'>Groups</Link>
                <label> | </label>
                <Link to='/about'>About</Link>
            </div>
        )
    }
}
