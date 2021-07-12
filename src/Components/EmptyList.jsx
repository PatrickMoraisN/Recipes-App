import React from 'react'
import { Link } from 'react-router-dom';

const EmptyList = () => {
  return (
    <section className="empty-page">
      <i class="fas fa-heart-broken heart-broken"></i>
      <h3>Você ainda não adicionou nenhuma receita aqui... Ta tudo bem?</h3>
      <Link to="/comidas">
        <button>Voltar <i class="fas fa-undo-alt"></i></button>
      </Link>
    </section>
  )
}

export default EmptyList
