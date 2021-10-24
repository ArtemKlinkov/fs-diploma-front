/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import HallContext from "../contexts/HallContext";
import ControllerHeader from "./ControllerHeader";

function OpenSales() {

  const {halls, handleShowCreatePopup, handleShowDeletePopup} = useContext(HallContext);

  return (
    <section className="conf-step">
      <ControllerHeader title="Открыть продажи"/>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
      </div>
    </section>
  );
}

export default OpenSales;