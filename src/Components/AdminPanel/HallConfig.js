/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import HallContext from "../../contexts/HallContext";
import Chair from "./Chair";
import ControllerHeader from "./ControllerHeader";

import AuthContext from "../../contexts/AuthContext";
import apiClient from "../../services/api";

function HallConfig() {
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const {halls} = useContext(HallContext);
  const [selected, setSelected] = useState({index:null, hall: null});
  const [chairConf, setChairConf] = useState({rows: "", cols: ""})
  const [chairs, setChairs] = useState([]);
  const [resetChanges, setResetChanges] = useState(false);
  
  const handleRadioChange = (index, hall) => {
    setSelected({index, hall});
  }

  const handleChairConfChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    setChairConf(prevForm => {return {...prevForm, [name]: value };});
  }

  const handleReset = () => {
    setResetChanges(true);
  }

  const handleSave = () => {
    const result = [];
    chairs.forEach(({id, row}) => {
      const row_num = id;

      row.forEach((el) => {
        result.push({
          "hall_id": selected.hall,
          "row_num": row_num,
          "seat_num": el.id,
          "status": el.status
        });
      });

    });

    const _chairConf = {'hall_id': selected.hall, 'rows': +chairConf.rows, 'cols': +chairConf.cols};
    apiClient.patch(`${process.env.REACT_APP_CINEMA_API +  '/api/hall_conf/' +  selected.hall}`, _chairConf,config)
    .then(apiClient.post(`${process.env.REACT_APP_CINEMA_API +  '/api/seat'}`, result, config)
    .then( response => {
      if (response.status === 200) {
        console.warn('ok');
      }
    }))
    .catch( err => {
      console.warn(err);
    });
  }

  useEffect(()=>{
    if (halls.length !== 0) setSelected({index: 0, hall: halls[0].id})
  }, [halls])
 

  useEffect(() => {

    if (selected.hall) {
      setChairs([]);
      if (resetChanges) setResetChanges(false);
      let _chairConf = {};

      apiClient.get(`${process.env.REACT_APP_CINEMA_API +  '/api/hall_conf'}/${selected.hall}`, config).then( response => {
        if (response.status === 200) {
          _chairConf = response.data;
        } else {
          setChairConf({rows: "", cols: ""})
        }
      })
      .then(
        response => {
          apiClient.get(`${process.env.REACT_APP_CINEMA_API +  '/api/seat'}/${selected.hall}`, config).then( response => {
            if (response.status === 200) {
              const gettedChairs = [];
              let row = [];
              let curRow = 0;
              response.data.forEach((el, index, arr) => {
      
                if (curRow === el.row_num) {
                  row.push({id: el.seat_num, status: el.status})
                } else {
                  gettedChairs.push({id: curRow, row: row});            
                  curRow = el.row_num;
                  row = [];
                  row.push({id: el.seat_num, status: el.status});
                }
                if (arr[index] === arr[arr.length-1]) {
                  gettedChairs.push({id: curRow, row: row}); 
                }
              })
      
              setChairs(gettedChairs);
              setChairConf(_chairConf);
            }
          }).catch (err => {
            setChairConf({rows: "", cols: ""})
          })
        }
      )
      .catch(err => {
        setChairConf({rows: "", cols: ""})
      }) 
    }   
  }, [selected, resetChanges]);

  useEffect(() => {
      const editedChairs = [];
      for (let curRow = 0; curRow < +chairConf.rows; curRow++) {
        const row = [];
        for (let col = 0; col < +chairConf.cols; col++) {
          row.push({id: col, status: chairs.length !== 0 && chairs[curRow] && chairs[curRow].row[col] ? chairs[curRow].row[col].status : "standard"});
        }
        editedChairs.push({id: curRow, row: row});
      }
      setChairs(editedChairs);
  }, [chairConf]);


  return (
    <section className="conf-step">
    <ControllerHeader title="Конфигурация залов"/>
    <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul className="conf-step__selectors-box">
        {halls.map(({ id, name }, index) => (
          <li key={id}>
            <input type="radio" className="conf-step__radio" name="chairs-hall" value={name} checked={index === selected.index} onChange={() => handleRadioChange(index, id)}/><span className="conf-step__selector">{name}</span>
          </li>))}          
        </ul>


        <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
        <div className="conf-step__legend">
          <label className="conf-step__label">Рядов, шт<input onChange={ handleChairConfChange } value={chairConf.rows} type="text" className="conf-step__input" placeholder="10" name="rows"/></label>
          <span className="multiplier">x</span>
          <label className="conf-step__label">Мест, шт<input onChange={ handleChairConfChange } value={chairConf.cols} type="text" className="conf-step__input" placeholder="8" name="cols"/></label>
        </div>

        <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
        <div className="conf-step__legend">
          <span className="conf-step__chair conf-step__chair_standard"></span> — обычные кресла
          <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
          <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
          <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
        </div>  
        
        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">

            {chairs.map((row) => {
               return <div key={row.id} className="conf-step__row"> 1
                {row.row.map((chair) => {
                  return <Chair key={'id' + chair.id + 'row' + row.id + 'hall' + selected.hall} chair={chair}/>
                })}
              </div> 
            })}

          </div>  
        </div>
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular" onClick={handleReset}>Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={handleSave}/>
        </fieldset>                 
      </div>
  </section>
  );
}

export default HallConfig;