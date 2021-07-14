import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import heartBlackIcon from '../images/blackHeartIcon.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FoodContext } from '../Context/FoodProvider';

const RecipesDoneCard = ({ list, tag, heart }) => {
  const { setFavoriteRecipesFilter } = useContext(FoodContext);
  const history = useHistory();

  const toastShare = () => {
    toast.dark('Link Copiado!!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const unsetItemFav = () => {
    return (
      toast.dark('</3 Item Desfavoritado =(', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    )
  }

  const handleClickShare = (elem) => {;
    toastShare();
    navigator.clipboard.writeText(`http://localhost:3000/${elem.type}s/${elem.id}`);
  };
  const hundleClick = (elem) => {
    const url = `/${elem.type}s/${elem.id}`;
    history.push(url);
  };

  const hundleClick2 = (idD) => {
    unsetItemFav();
    const array = list.filter((elem) => elem.id !== idD);
    setFavoriteRecipesFilter(array);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  };

  const checkType = (elem, index) => {
    if (elem.type === 'comida') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="food-name"
        >
          {`${elem.area} - ${elem.category}`}
        </p>
      );
    }
    return (<p data-testid={ `${index}-horizontal-top-text` } className="drink-name">{elem.alcoholicOrNot}</p>);
  };
  return (
    <>
      {list.map((elem, index) => (
        <div key={ `${index}-horizontal-name` } className="favorite-card">
          <input
            className="image-click"
            type="image"
            data-testid={ `${index}-horizontal-image` }
            src={ elem.image }
            alt="recipe"
            onClick={ () => hundleClick(elem) }
          />
          { checkType(elem, index)}
          
          <button
            type="button"
            className="recipe-name-favorite recipe-name-done"
            onClick={ () => hundleClick(elem) }
            data-testid={ `${index}-horizontal-name` }
          >
            {elem.name}
          </button>
          <i
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Share Recipe"
            onClick={ () => handleClickShare(elem) }
            className="share fas fa-share-alt share-favorite"
          ></i>
          <p data-testid={ `${index}-horizontal-done-date` } className="data">{elem.doneDate}</p>
          {tag && elem.tags.map((tag2) => (
            <div key={ `${index}-${tag}-horizontal-tag` }>
              <span data-testid={ `${index}-${tag2}-horizontal-tag` }></span>
            </div>
          ))}
          {heart
            && 
            <i
            data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => hundleClick2(elem.id) }
              className={`favorite heart-favorite fas fa-heart`}
              alt="Favorite button"
            ></i>}
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

RecipesDoneCard.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  tag: PropTypes.bool.isRequired,
  heart: PropTypes.bool.isRequired,
}.isRequired;

export default RecipesDoneCard;
