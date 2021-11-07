/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import closeButton from "../img/close.png"
import HallContext from "../contexts/HallContext";
import MoviesContext from "../contexts/MoviesContext";

function DeleteMovieFromTimeline() {

  const {showDeleteFromTimelinePopup, handleShowDeleteFromTimelinePopup, deletingMovie, handleDeleteMovieFromTimeline} = useContext(MoviesContext);

  const handleCancel = (evt) => {
    evt.preventDefault();
    handleShowDeleteFromTimelinePopup();
  } 

  const sendForm = (e) => {
    e.preventDefault();
    handleDeleteMovieFromTimeline(deletingMovie);  
  }

  return (
    <div className={showDeleteFromTimelinePopup ? "popup active" : "popup"}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Снятие с сеанса
              <a className="popup__dismiss" href="#" onClick={handleCancel}><img src={closeButton} alt="Закрыть" /></a>
            </h2>

          </div>
          <div className="popup__wrapper">
            <form onSubmit={sendForm} acceptCharset="utf-8">
              <p className="conf-step__paragraph">Вы действительно хотите снять с сеанса фильм <span>{deletingMovie.title}</span>?</p>
              {/* <!-- В span будет подставляться название фильма --> */}
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={handleCancel}>Отменить</button>            
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default DeleteMovieFromTimeline