import React, { Component } from 'react'

export class search extends Component {
    state={
        searchValue:'',
    };


    handleOnChange =event=>{
        this.setState({
            searchValue:event.target.value
        });
    }

    handleSearch =(e) =>{

    }
    
    render() {
        return (
            <div class="search_page">
              <h1 class="h1">Welcome to the food pantry app</h1>  
              <input class= "input"
              name="text" 
              type="text" 
              placeholder="Search" 
             // onChange={event =>this.handleOnChange(event)}
              value={this.state.searchValue}
              />
              <button class="btn_submit"
              //onClick={this.handleSearch}
              >
                  Search
              </button>
            </div>
        )
    }
}

export default search
