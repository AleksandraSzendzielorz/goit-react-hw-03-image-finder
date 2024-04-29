import css from '../styles/Searchbar.module.css';
import React, { useState } from 'react';
import MySvg from '../svg/search.svg';

export const Searchbar = ({ handleForm }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleForm(event, searchInput);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <img src={MySvg} alt="hand-lens" className={css.button}></img>

        <input
          className={css.input}
          type="text"
          value={searchInput}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
