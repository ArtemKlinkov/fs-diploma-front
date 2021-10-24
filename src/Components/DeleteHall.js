/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import HallContext from "../contexts/HallContext";
import closeButton from "../img/close.png"

function DeleteHall() {
  const {showDeletePopup, handleShowDeletePopup, deletingHall, handleDelete} = useContext(HallContext);

  const handleCancel = (evt) => {
    evt.preventDefault();
    handleShowDeletePopup();
  }

  const delete_hall = (evt) => {
    evt.preventDefault();
    handleDelete(deletingHall.id);
  }

  return(
    <div className={showDeletePopup ? "popup active" : "popup"}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Удаление зала
              <a className="popup__dismiss" href="#" onClick={handleCancel}><img src={closeButton} alt="Закрыть" /></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form onSubmit={delete_hall} acceptCharset="utf-8">
              <p className="conf-step__paragraph">Вы действительно хотите удалить зал <span>{deletingHall.name}</span>?</p>
              {/* <!-- В span будет подставляться название зала --> */}
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={handleCancel}>Отменить</button>            
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default DeleteHall;