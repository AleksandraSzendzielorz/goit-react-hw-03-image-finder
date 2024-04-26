import css from '../styles/Searchbar.module.css';

export const Searchbar = () => {
  return (
    <header className={css.searchbar}>
      <form className={css.form}>
        <button type="submit" className={css.button}>
          <span className="button-label">
            <img src="../svg/search.svg" alt="hand-lens" width="40" />
          </span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
