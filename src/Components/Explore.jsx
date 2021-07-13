import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

const Explore = () => {
  const [product, setProduct] = useState(null);
  const [idn, setIdn] = useState([]);
  const location = useLocation();
  const page = location.pathname.split('/')[2];

  useEffect( () => {
    const getRandomProduct = async () => {
      let pageName = '';
      let identifier = [];
      if (page === 'bebidas') {
        pageName = 'thecocktaildb';
        identifier = ['drinks', 'Drink'];
        setIdn(identifier);
      } else if (page === 'comidas') {
        pageName = 'themealdb';
        identifier = ['meals', 'Meal'];
        setIdn(identifier);
      }
      const endpoint = `https:www.${pageName}.com/api/json/v1/1/random.php`;
      const result = await fetch(endpoint).then((data) => data.json());
      setProduct(result[identifier[0]]);
    };
    getRandomProduct();
  }, []);

  if (product) {
  return (
    <section className="explore-random">
      <Header title="Aleatória"/>
      <img src={ product[0][`str${idn[1]}Thumb`] } alt="recipe" className="details-img"/>
      <p>{ product[0][`str${idn[1]}`] }</p>
      <Link to={ `/${page}/${product[0][`id${idn[1]}`]}` }>
        <button type="button">Conheça essa receita</button>
      </Link>
      <Footer />
    </section>
  );
  } else {
    return (<Loading />);
  }
};

export default Explore;
