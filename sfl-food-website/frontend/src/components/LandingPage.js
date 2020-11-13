import React, { Component } from 'react';
import UserAccounts from "./UserAccounts";
import Search from "./Search";
 
class LandingPage extends Component {
    render() { 
        return (
            <div>
                <UserAccounts/>
                <Search/>
            </div>


            
            
        );
    }
}
 
export default LandingPage;