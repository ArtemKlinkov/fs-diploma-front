/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from "react";
import HallContext from "../contexts/HallContext";
import MoviesContext from "../contexts/MoviesContext";

import ControllerHeader from "./ControllerHeader";

import Timeline from "./Timeline";
import Movie from "./Movie";

function Schedule() {
  const {movies, handleShowCreatePopup} = useContext(MoviesContext);
  const {halls} = useContext(HallContext);

  return (
    <section className="conf-step">
      <ControllerHeader title="Сетка сеансов"/>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={handleShowCreatePopup}>Добавить фильм</button>
        </p>

        <div className="conf-step__movies">
          {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </div>

        <div className="conf-step__seances">
          {halls.map((hall) => {
            return <Timeline key={hall.id} id={hall.id} title={hall.name} />
          })}
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset>          
      </div>
    </section>
  );
}

export default Schedule;