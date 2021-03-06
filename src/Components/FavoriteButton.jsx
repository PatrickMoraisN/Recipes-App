import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavoriteButton = ({ product, idn }) => {
  const objMeal = {
    type: "comida",
    alcoholicOrNot: "",
    area: product[0].strArea,
  };
  const objDrink = {
    type: "bebida",
    alcoholicOrNot: product[0].strAlcoholic,
    area: "",
  };
  const [obj] = React.useState(idn[1] === "Meal" ? objMeal : objDrink);
  const local = localStorage.getItem("favoriteRecipes");
  const [favoriteList, setFavoriteList] = React.useState(
    local ? JSON.parse(local) : null
  );
  const [isAFavorite, setFavorite] = React.useState(false);
  const { id } = useParams();

    const setItemFav = () => {
      return (
        toast.dark('♥ Item Favoritado!!', {
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

    const unsetItemFav = () => {
      return (
        toast.dark('</3 Item desfavoritado =(', {
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

  const useHandleClickFavorite = () => {
    setFavorite(!isAFavorite);
    isAFavorite ? unsetItemFav() : setItemFav();
    const pArray = product[0];
    const actualFavorite = {
      id: pArray[`id${idn[1]}`],
      type: obj.type,
      alcoholicOrNot: obj.alcoholicOrNot,
      area: obj.area,
      category: pArray.strCategory,
      name: pArray[`str${idn[1]}`],
      image: pArray[`str${idn[1]}Thumb`],
    };
    if (!isAFavorite && favoriteList) {
      const favoriteListArray = [...favoriteList, actualFavorite];
      setFavoriteList(favoriteListArray);
      localStorage.setItem(
        "favoriteRecipes",
        JSON.stringify(favoriteListArray)
      );
    } else if (!isAFavorite && !favoriteList) {
      const favoriteListArray = [actualFavorite];
      setFavoriteList(favoriteListArray);
      localStorage.setItem(
        "favoriteRecipes",
        JSON.stringify(favoriteListArray)
      );
    }
  };
  const checkButtonFavorite = () => {
    if (favoriteList) {
      favoriteList.forEach((favoriteItem) => {
        if (favoriteItem.id === id) {
          setFavorite(true);
        }
      });
    }
  };
  React.useEffect(() => {
    checkButtonFavorite();
  }, [favoriteList]);

  return (
    <>
      <i
        data-testid="favorite-btn"
        onClick={useHandleClickFavorite}
        id="favorite-btn"
        className={`favorite ${isAFavorite ? "fas fa-heart" : "far fa-heart"} `}
        alt="Favorite button"
      ></i>
      <ToastContainer />
    </>
  );
};

FavoriteButton.propTypes = {
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
}.isRequired;

export default FavoriteButton;
