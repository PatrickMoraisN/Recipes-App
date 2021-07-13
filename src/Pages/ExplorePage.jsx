import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const ExplorePage = () => (
  <section className="explore-page">
    <Header title="Explorar" />
    <Link to="/explorar/comidas">
      <button type="button" data-testid="explore-food">
        Explorar Comidas
      </button>
    </Link>
    <Link to="/explorar/bebidas">
      <button type="button" data-testid="explore-drinks">
        Explorar Bebidas
      </button>
    </Link>
    <Footer />
  </section>
);

export default ExplorePage;
