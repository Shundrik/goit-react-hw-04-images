import React from 'react';
import "../../Style/styles.css"
// import styled from 'styled-components';
// const Header = styled


export class Searchbar extends React.Component {
  state = {
    query:'',
    

  };
 
 handleChange = ({target:{value:query}})=>{
    this.setState({query})
 }

hendleSubmitForm = e =>{
    e.preventDefault();
    this.props.onSubmit(this.state.query)
}


  render() {
    const {query} = this.state
    return (
      <header className="Searchbar">
        <form className="SearchForm"
        onChange={this.handleChange}
        onSubmit={this.hendleSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
          />
        </form>
      </header>
    );
  }
}
