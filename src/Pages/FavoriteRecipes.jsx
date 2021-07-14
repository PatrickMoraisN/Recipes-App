import React from 'react';
import Header from '../Components/Header';
import RecipesDoneCard from '../Components/RecipesDoneCard';
import FiltersOfDoneRecipes from '../Components/FiltersOfDoneRecipes';
import { FoodContext } from '../Context/FoodProvider';
import EmptyList from '../Components/EmptyList';

const FavoriteRecipes = () => {
  const [list, setList] = React.useState(null);
  const { favoriteRecipesFilter } = React.useContext(FoodContext);

  React.useEffect(() => {
    if (!favoriteRecipesFilter) {
      const array = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setList(array);
    } else {
      setList(favoriteRecipesFilter);
    }
  }, [favoriteRecipesFilter]);

  if (list && list.length != 0) {
    return (
      <section className="favorite-page">
        <Header page="receitas-favoritas" title="Receitas Favoritas" />
        <FiltersOfDoneRecipes page="favorite" />
        <RecipesDoneCard list={ list } tag={ false } heart />
      </section>
    );
  }
  return (<EmptyList />)
};

export default FavoriteRecipes;
