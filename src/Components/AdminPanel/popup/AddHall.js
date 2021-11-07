/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from "react";
import HallContext from "../../../contexts/HallContext";
import closeButton from "../../../img/close.png"

function AddHall() {
  const {showCreatePopup, handleShowCreatePopup, handleCreateHall, error} = useContext(HallContext);
  const [form, setForm] = useState({name: ""})
  
  const handleCancel = (evt) => {
    evt.preventDefault();
    handleShowCreatePopup();
    setForm({name: ""});
  }

  const  createHall = async (evt) => {
    evt.preventDefault();
    handleCreateHall(form.name).then(result => {
      if (result.hasOwnProperty("status") && result.status === 201) {
        setForm({name: ""});
      }
    });

  }
  
  const handleChange = ({target}) => {
    const value = target.value;
    setForm(prevForm => {return {...prevForm, name: value };});
  }

  return(
    <div className={showCreatePopup ? "popup active" : "popup"}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление зала
              <a className="popup__dismiss" href="#" onClick={handleCancel}><img src={closeButton} alt="Закрыть" /></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form onSubmit={createHall} method="post" acceptCharset="utf-8">
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                Название зала
                <input onChange={ handleChange } value={form.name} className="conf-step__inputв" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required />
              </label>
              {error && 
                <p className="login__error"> {error} </p>
              }              
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={handleCancel}>Отменить</button>            
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHall;