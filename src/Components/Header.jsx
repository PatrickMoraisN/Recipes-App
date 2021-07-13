import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ page, title }) {
  const [showSearch, setShowSearch] = React.useState(false);
  const {
    setRadioSelected,
    setSearchText,
    setCurrentPage } = React.useContext(FoodContext);

    const changeLabel = (e) => {
      const btns = document.querySelectorAll(".search-text")
      btns.forEach(btn => btn.classList.remove('search-selected'))
      e.target.parentNode.classList.add('search-selected')
    }

  const handleClick = () => {
    const radios = document.querySelectorAll('[name="search"]');
    const searchInput = document.querySelector('#searchInput');
    for (let i = 0; i < radios.length; i += 1) {
      if (radios[i].checked) {
        setRadioSelected(radios[i].value);
        if (radios[i].value === 'Primeira letra' && searchInput.value.length !== 1) {
          alert('Sua busca deve conter somente 1 (um) caracter');
        }
      }
    }
    setSearchText(searchInput.value);
    setCurrentPage(page);
  };

  const searchInputs = () => (
    <div className="search-header">
      <input data-testid="search-input" id="searchInput" className="search-input"/>
      <br />
      <div className="search-options">
        <label htmlFor="ingredient" className="text search-text">
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="Ingrediente"
            name="search"
            onClick={(e) => changeLabel(e) }
          />
          Ingrediente
        </label>
        <label htmlFor="name" className="text search-text">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            value="Nome"
            name="search"
            onClick={(e) => changeLabel(e) }
          />
          Nome
        </label>
        <label htmlFor="first-letter" className="text search-text">
          <input
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="Primeira letra"
            name="search"
            onClick={(e) => changeLabel(e) }
          />
          Primeira letra
        </label>
        <br />
      </div>
      <button
        data-testid="exec-search-btn"
        className="search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );

  return (
    <section>
      <header>
        <Link to="/perfil">
          <i className="fas fa-user user"></i>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <i 
          className="fas fa-search lupa"
          onClick={ () => setShowSearch(!showSearch) }
          alt="search bar"
        >

        </i>
        {/* <input
          type="image"
          data-testid="search-top-btn"
          onClick={ () => setShowSearch(!showSearch) }
          src={ searchIcon }
          alt="search bar"
        /> */}
      </header>
      {showSearch && searchInputs()}
    </section>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
