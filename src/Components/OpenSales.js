/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import HallContext from "../contexts/HallContext";
import ControllerHeader from "./ControllerHeader";

function OpenSales() {

  const {halls, handleOpenSales} = useContext(HallContext);
  const [selected, setSelected] = useState({index:0, hall_id: null});
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  
  const handleRadioChange = (index, hall_id) => {
    setSelected({index, hall_id});
  }

  useEffect(() => {
    if (selected.hall_id) {
      const foundHall = halls.find( (el) => el.id === selected.hall_id);
      setIsSalesOpen(foundHall ? !foundHall.is_active : false);
    } else if (halls && halls[0]) {
      setIsSalesOpen(!halls[0].is_active);
    }
  }, [selected, halls]) 

  return (
    <section className="conf-step">
      <ControllerHeader title="Открыть продажи"/>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <ul className="conf-step__selectors-box">
          {halls.map(({ id, name }, index) => (
            <li key={id}>
              <input type="radio" className="conf-step__radio" name="open-sales-hall" value={name} checked={index === selected.index} onChange={() => handleRadioChange(index, id)} /><span className="conf-step__selector">{name}</span>
            </li>)
          )}           
        </ul>         
        <button className="conf-step__button conf-step__button-accent" onClick={() => handleOpenSales(selected.hall_id ? selected.hall_id : halls[0].id, isSalesOpen)}>{isSalesOpen ? "Открыть" : "Приостановить"} продажу билетов</button>
      </div>
    </section>
  );
}

export default OpenSales;