/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';
import Header from './Header';

function Login() {
  const { token, handleLogin, error, passwordError } = useContext(AuthContext);

  const history = useHistory();
  useEffect(() => {
    if (token) {
      history.push("/admin")
    }
  }, [token]);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;
    setForm(prevForm => {return {...prevForm, [name]: value };});
  }

  function login(evt){
    evt.preventDefault();

    handleLogin(form.email, form.password);
  }

  return (
    <>
      <Header />
      <main>
        <section className="login">
          <header className="login__header">
            <h2 className="login__title">Авторизация</h2>
          </header>
          <div className="login__wrapper">
            <form onSubmit={login} className="login__form" acceptCharset="utf-8">
              <label className="login__label" htmlFor="email">
                E-mail
                <input onChange={ handleChange } value={form.email} className="login__input" type="mail" placeholder="example@domain.xyz" name="email" required />
              </label>
              {error && 
                <p className="login__error"> {error} </p>
              }
              <label className="login__label" htmlFor="password">
                Пароль
                <input onChange={ handleChange } value={form.password} className="login__input" type="password" placeholder="" name="password" required />
              </label>
              {passwordError && 
                <p className="login__error"> {passwordError} </p>
              }              
              <div className="text-center">
                <input value="Авторизоваться" type="submit" className="login__button" />
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login