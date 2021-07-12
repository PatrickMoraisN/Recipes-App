import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const ButtonsCategory = ({ page, identifier }) => {
  const [categorys, setCategorys] = useState([]);
  const [clicks, setClicks] = useState({ name: '', clicks: 1 });
  const { setFoods, setCategory } = React.useContext(FoodContext);
  const endpoint = `https://www.${page}.com/api/json/v1/1/list.php?c=list`;

  useEffect(() => {
    const getCategorys = async () => {
      const request = await fetch(endpoint);
      const resolve = await request.json();
      setCategorys(resolve[identifier]);
    };
    setCategory(true);
    getCategorys();
  }, []);

  const setAllSelected = () => {
    const allBtn = document.querySelector('#all');
    allBtn.classList.add('selected');
  };

  const setTargetSelected = (event) => {
    console.log(event.target.classList.add('selected'))
  };

  const handleClick = async (event, category) => {
    const btnSelected = document.querySelector('.selected');
    btnSelected.classList.remove('selected')
    setTargetSelected(event);
    if (clicks.clicks !== 2) {
      if (clicks.name === category) {
        const response2 = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=`);
        const json2 = await response2.json();
        setClicks({ name: '', clicks: 1 });
        setFoods(json2[identifier]);
        btnSelected.classList.remove('selected')
        setAllSelected();
      } else {
        const response = await fetch(`https://www.${page}.com/api/json/v1/1/filter.php?c=${category}`);
        const json = await response.json();
        setClicks({ name: category });
        setFoods(json[identifier]);
      }
    }
  };

  const handleClickAll = async () => {
    const response2 = await fetch(`https://www.${page}.com/api/json/v1/1/search.php?s=`);
    const json2 = await response2.json();
    setFoods(json2[identifier]);
    setAllSelected();
  };

  return (
    <section className="btns-category">
      <button
        type="button"
        id="all"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
        className="btn-category selected"
      >
        All
      </button>
      {
        categorys.map((category, index) => {
          console.log(category)
          const maxLength = 4;
          if (index <= maxLength) {
            return (
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ (event) => handleClick(event, category.strCategory) }
                key={ category.strCategory }
                className={`btn-category ${category.strAlcoholic > 0 && 'btn-category-drink'}`}
              >
                {category.strCategory}
              </button>
            );
          } return null;
        })
      }
    </section>
  );
};

ButtonsCategory.propTypes = {
  page: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default ButtonsCategory;
