import React, { Component } from 'react'  
  
export class Header extends Component {  
    render() {  
        return (  
            <div>  
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">  
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">  
                    <i className="fa fa-bars"></i>  
                    </button> 

                    <ul className="nav navbar-nav navbar-right ml-auto">
                        <li><a href="#">Sign in</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul> 
                   
                </nav>  
            </div>  
        )  
    }  
}  
  
export default Header  