/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import closeButton from "../img/close.png"
import HallContext from "../contexts/HallContext";
import MoviesContext from "../contexts/MoviesContext";

function AddMovie(props) {

  const {showAddToTimelinePopup, handleShowAddToTimelinePopup} = useContext(MoviesContext);
  const {halls} = useContext(HallContext);

  const [form, setForm] = useState({hall: "", start_time: ""})
  
  const handleCancel = (evt) => {
    evt.preventDefault();
    handleShowAddToTimelinePopup();
    setForm({hall: "", start_time: ""});
  } 

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    setForm(prevForm => {return {...prevForm, [name]: value };});
  }


  return (
    <div className={showAddToTimelinePopup ? "popup active" : "popup"}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление сеанса
              <a className="popup__dismiss" href="#" onClick={handleCancel}><img src={closeButton} alt="Закрыть"/></a>
            </h2>

          </div>
          <div className="popup__wrapper">
            <form action="add_movie" method="post" accept-charset="utf-8">
              <label className="conf-step__label conf-step__label-fullsize" for="hall">
                Название зала
                <select className="conf-step__input" onChange={handleChange} name="hall" required>
                  {halls.map( (hall, index) =>  <option value={hall.id} selected={index === 0}>{hall.name}</option>)}
                </select>
              </label>
              <label className="conf-step__label conf-step__label-fullsize" for="name">
                Время начала
                <input className="conf-step__input" onChange={handleChange} type="time" value={form.start_time} name="start_time" required/>
              </label>

              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить" className="conf-step__button conf-step__button-accent"/>
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