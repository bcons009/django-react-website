import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './search'

class App extends Component {
    render() {
        return (
           <Search />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));