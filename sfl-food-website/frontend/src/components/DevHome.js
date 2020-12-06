import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class DevHome extends Component {
    render() {
        return (
            <div>
                <h1>Dev Test Home Page</h1>
                <form>
                    <Link
                        to='/Search'
                    >
                        Search page (Sabna)
                    </Link>
                    <br />
                    <Link
                        to='/Locations'
                    >
                        Locations table (Bryan)
                    </Link>
                    <br />
                    <Link
                        to='/Map'
                    >
                        Map w/ locations (Bryan)
                    </Link>
                    <br />
                    <Link
                        to='/UserAccounts'
                    >
                        User Sign Up/Log in (Trevor)
                    </Link>
                    <br />
                    <Link
                        to='/AddEventPage'
                    >
                        Add Event Form (Bryan)
                    </Link>
                    <br />
                    <Link
                        to='/ViewYourEvents'
                    >
                        View Events Created by Logged-in User (Bryan)
                    </Link>
                </form>
            </div>
        )
    }
}

export default DevHome
