import { useState } from 'react';
import '../../Style/styles.css';
// import styled from 'styled-components';
// const Header = styled

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target: { value: query } }) => {
    setQuery(query );
  };

  const hendleSubmitForm = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onChange={handleChange}
        onSubmit={hendleSubmitForm}
      >
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
};
