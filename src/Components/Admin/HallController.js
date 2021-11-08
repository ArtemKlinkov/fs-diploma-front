/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import HallContext from "../../contexts/HallContext";
import ControllerHeader from "./ControllerHeader";

function HallController() {

  const {halls, handleShowCreatePopup, handleShowDeletePopup} = useContext(HallContext);

  return (
    <section className="conf-step">
      <ControllerHeader title="Управление залами"/>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          
        {halls.map(({ id, name }) => (
            <li key={id}>{name}
              <button className="conf-step__button conf-step__button-trash" onClick={() => handleShowDeletePopup(id, name)}></button>
            </li>)
          )} 
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={() => handleShowCreatePopup()}>Создать зал</button>
      </div>
    </section>
  );
}

export default HallController;