/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import closeButton from "../img/close.png"
import MoviesContext from "../contexts/MoviesContext";

function AddMovie(props) {

  const {showCreatePopup, handleShowCreatePopup, handleCreateMovie, error} = useContext(MoviesContext);
  const [form, setForm] = useState({name: "", duration: ""})
  
  const handleCancel = (evt) => {
    evt.preventDefault();
    handleShowCreatePopup();
    setForm({name: "", duration: ""});
  }  

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    setForm(prevForm => {return {...prevForm, [name]: value };});
  }

  const  createMovie = async (evt) => {
    evt.preventDefault();
    if (form.name && form.duration) {
      handleCreateMovie(form.name, form.duration).then(result => {
        if (result.hasOwnProperty("status") && result.status === 201) {
          setForm({name: ""});
        }
      });
    }
  }

  return (
    <div className={showCreatePopup ? "popup active" : "popup"}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление фильма
              <a className="popup__dismiss" href="#" onClick={handleCancel}><img src={closeButton} alt="Закрыть" /></a>
            </h2>

          </div>
          <div className="popup__wrapper">
            <form onSubmit={createMovie} method="post" acceptCharset="utf-8">
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                Название фильма
                <input className="conf-step__input" onChange={ handleChange } value={form.name} type="text" placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="name" required />
              </label>
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
                Длительность фильма
                <input className="conf-step__input" onChange={ handleChange } value={form.duration} type="text" placeholder="Например, 120" name="duration" required />
              </label>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить фильм" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={handleCancel}>Отменить</button>            
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AddMovie