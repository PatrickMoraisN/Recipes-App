import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProfilePage() {
  const [email, setEmail] = React.useState();
  const history = useHistory();
  React.useEffect(() => {
    const emailStore = localStorage.getItem('user');
    setEmail(emailStore.split('"')[3]);
  }, []);

  const logoutFunc = () => {
    localStorage.clear();
    history.push('/');
  };

  const redirect = ({ target }) => {
    if (target.id === 'done') {
      history.push('/receitas-feitas');
    } else {
      history.push('/receitas-favoritas');
    }
  };

  return (
    <section className="profile-page">
      <Header title="Perfil" />
      <p data-testid="profile-email">{email}</p>
      <div className="btn-profile">
        <button
          type="button"
          id="done"
          data-testid="profile-done-btn"
          onClick={ redirect }
          className="profile-btns"
        >
          Receitas Feitas
          <i class="fas fa-check-circle icon-profile"></i>
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ redirect }
          className="profile-btns"
        >
          Receitas Favoritas
          <i class="fas fa-grin-hearts icon-profile"></i>
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutFunc }
          className="profile-btns"
        >
          Sair
          <i class="fas fa-sign-out-alt icon-profile"></i>
        </button>
      </div>
      <Footer />
    </section>
  );
}

export default ProfilePage;
