import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Home extends Component {
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
                </form>
            </div>
        )
    }
}

export default Home
