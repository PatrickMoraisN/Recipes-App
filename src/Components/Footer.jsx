import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FoodContext } from '../Context/FoodProvider';

const Footer = () => {
  const { setCategory } = React.useContext(FoodContext);

  const handleClick = () => {
    setCategory(false);
  };

  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
      <i 
        class="fas fa-cocktail bebida"
        data-testid="drinks-bottom-btn"
        onClick={ handleClick }
        alt="Drink icon"
      >
      </i>
      </Link>
      <Link to="/explorar">
        <i class="fas fa-globe-americas explore"
          type="image"
          data-testid="explore-bottom-btn"
          onClick={ handleClick }
          alt="Explore icon"
        >
      </i>
      </Link>
      <Link to="/comidas">
      <i class="fas fa-hamburger hamburguer"
        data-testid="food-bottom-btn"
        onClick={ handleClick }
        alt="Food icon"
      >
      </i>
      </Link>
    </footer>);
};

export default Footer;
