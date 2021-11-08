/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import HallContext from "../../contexts/HallContext";
import ControllerHeader from "./ControllerHeader";
import apiClient from "../../services/api";
import AuthContext from "../../contexts/AuthContext";

function PriceConfig() {
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const {halls, handleShowCreatePopup, handleShowDeletePopup} = useContext(HallContext);
  const [selected, setSelected] = useState({index:0, hall: null});
  const [prices, setPrices] = useState({standard: "", vip: ""})
  const [resetChanges, setResetChanges] = useState(false);

  const handleRadioChange = (index, hall) => {
    setSelected({index, hall});
  }

  const handlePriceChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    setPrices(prevState => {return {...prevState, [name]: value };});
  }

  const handleReset = () => {
    setResetChanges(true);
  }

  const handleSave = () => {
    const savedData = [];
    for (const key in prices) {
      savedData.push({'hall_id': selected.hall, status: key, price: +prices[key]});
    }

    apiClient.post(`${process.env.REACT_APP_CINEMA_API +  '/api/price_list'}`, savedData, config)
    .then( response => {
      if (response.status === 200) {
        console.warn('ok');
      }
    })
    .catch(err => {
      console.warn(err);
    });
  }

  useEffect(()=>{
    if (halls.length !== 0) setSelected({index: 0, hall: halls[0].id})
  }, [halls])

  useEffect(() => {
    if (selected.hall) {
      if (resetChanges) setResetChanges(false);

      apiClient.get(`${process.env.REACT_APP_CINEMA_API +  '/api/price_list'}/${selected.hall}`, config).then( response => {
        if (response.status === 200) {
          setPrices({standard: "", vip: ""});          
          response.data.map((el) => {
              setPrices(prevState => { return { ...prevState, [el.status]: el.price }; });
            });
        } else {
          setPrices({standard: "", vip: ""});
        }
      })
      .catch(err => {
        setPrices({standard: "", vip: ""})
      }) 
    } 
  }, [selected, resetChanges]);

  return (
    <section className="conf-step">
      <ControllerHeader title="Конфигурация цен"/>

      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul className="conf-step__selectors-box">
          {halls.map(({ id, name }, index) => (
            <li key={id}>
              <input type="radio" className="conf-step__radio" name="prices-hall" value={name} checked={index === selected.index} onChange={() => handleRadioChange(index, id)} /><span className="conf-step__selector">{name}</span>
            </li>)
          )}           
        </ul>
          
        <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей<input onChange={ handlePriceChange } value={prices.standard} type="text" className="conf-step__input" placeholder="0" name="standard" /></label>
            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
          </div>  
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей<input onChange={ handlePriceChange } value={prices.vip} type="text" className="conf-step__input" placeholder="0" name="vip"/></label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
          </div>  
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular" onClick={handleReset}>Отмена</button>
          <input onClick={handleSave} type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
        </fieldset>  
      </div>


    </section>
  );
}

export default PriceConfig;