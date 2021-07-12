import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';

const Card = ({ thumb, name, index, id }) => {
  const history = useHistory();
  const { identifier } = React.useContext(FoodContext);
  const handleClick = () => {
    let recipe = '';
    if (identifier === 'Drink') recipe = 'bebidas';
    if (identifier === 'Meal') recipe = 'comidas';
    history.push(`/${recipe}/${id}`);
  };
  return (
    <button
      type="button"
      className="box"
      data-testid={ `${index}-recipe-card` }
      onClick={ handleClick }
    >
      <span>
        <img
          src={ thumb }
          alt={ name }
          className="img-card"
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` } className="title-card">{name}</h3>
      </span>
    </button>
  );
};

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
