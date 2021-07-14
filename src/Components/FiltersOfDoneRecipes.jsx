import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const FiltersOfDoneRecipes = ({ page }) => {
  const { setDoneRecipesFilter } = useContext(FoodContext);
  const { setFavoriteRecipesFilter } = useContext(FoodContext);

  const setSelected = (typeOfButton) => {
    let Btn = '';
    const btnSelected = document.querySelector('.selected');

    if (btnSelected !== null) btnSelected.classList.remove('selected');

    if (typeOfButton === 'meal') {
      Btn = document.querySelector('#btn-food');
    } else if (typeOfButton === 'drink') {
      Btn = document.querySelector('#btn-drink');
    } else {
      Btn = document.querySelector('#all');
    }
    Btn.classList.add('selected');
  };

  useEffect(() => {
   const Btn = document.querySelector('#all');
   Btn.classList.add('selected');
  }, []);

  const hundleClick = ({ target }) => {
    const array = JSON.parse(localStorage.getItem('doneRecipes'));
    const array2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let list = [];
    if (page === 'favorite') {
      if (target.id === 'btn-food') {
        list = array2.filter((elem) => elem.type === 'comida');
        setFavoriteRecipesFilter(list);
        setSelected('meal');
      } else if (target.id === 'btn-drink') {
        list = array2.filter((elem) => elem.type === 'bebida');
        setFavoriteRecipesFilter(list);
        setSelected('drink');
      } else {
        setFavoriteRecipesFilter(array2);
        setSelected('all');
      }
    }
    if (page === 'done') {
      if (target.id === 'btn-food') {
        list = array.filter((elem) => elem.type === 'comida');
        setDoneRecipesFilter(list);
        setSelected('meal');
      } else if (target.id === 'btn-drink') {
        list = array.filter((elem) => elem.type === 'bebida');
        setDoneRecipesFilter(list);
        setSelected('drink');
      } else {
        setDoneRecipesFilter(array);
        setSelected('all');
      }
    }
  };

  return (
    <section>
      <button
        id="all"
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ hundleClick }
        className="favorite-btn"
      >
        All
      </button>
      <button
        id="btn-food"
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ hundleClick }
        className="favorite-btn"
      >
        Food
      </button>
      <button
        id="btn-drink"
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ hundleClick }
        className="favorite-btn"
      >
        Drinks
      </button>
    </section>
  );
};

FiltersOfDoneRecipes.propTypes = {
  page: PropTypes.string.isRequired,
}.isRequired;

export default FiltersOfDoneRecipes;
