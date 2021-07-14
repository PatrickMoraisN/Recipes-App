import React from "react";
import PropTypes from "prop-types";
import FavoriteButton from "./FavoriteButton";
import shareBtnImg from "../images/shareIcon.svg";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailsButtons({ product, idn }) {

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
  const handleClickShare = () => {
    toastShare();
    // navigator.clipboard.writeText(window.location.href)
    const url = window.location.href.split("/");
    const maxLength = 6;
    if (url.length === maxLength) {
      url.pop();
      navigator.clipboard.writeText(url.join("/"));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="btns-details">
      <FavoriteButton product={product} idn={idn} />
      <i
        data-testid="share-btn"
        onClick={handleClickShare}
        id="share-btn"
        src={shareBtnImg}
        alt="Share button"
        className="share fas fa-share-alt"
      ></i>
    </div>
  );
}

DetailsButtons.propTypes = {
  product: PropTypes.array,
  idn: PropTypes.string,
}.isRequired;

export default DetailsButtons;
