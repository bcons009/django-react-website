import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header'
import Search from './search'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Search />
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));