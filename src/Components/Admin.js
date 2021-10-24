import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header';
import HallController from './HallController';
import AuthContext from '../contexts/AuthContext';
import HallProvider from '../Providers/HallProvider';
import HallConfig from './HallConfig';
import DeleteHall from './DeleteHall';
import AddHall from './AddHall';
import PriceConfig from './PriceConfig';
import Schedule from './Schedule';
import OpenSales from './OpenSales';
import MoviesProvider from '../Providers/MoviesProvider';
import AddMovie from './AddMovie';
import AddMovieToTimeline from './AddMovieToTimeline';



function Admin() {

  const history = useHistory();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (!token) {
      history.push("/login")
    }
  }, [history, token]);

  return (
    <HallProvider>
      <MoviesProvider>
        <DeleteHall />
        <AddHall />
        <AddMovie />
        <AddMovieToTimeline />
        <Header />
        <main className="conf-steps">
          <HallController />
          <HallConfig />
          <PriceConfig />
          <Schedule />
          <OpenSales />
        </main>
      </MoviesProvider>
    </HallProvider>
  )
}

export default Admin