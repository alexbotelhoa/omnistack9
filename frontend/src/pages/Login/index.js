import React, { useState } from 'react';

import './styles.css';
import api from '../../services/api';

export default function Login({ history }) {
  const [mensage, setMensage] = useState(null);
  const [email, setEmail] = useState('');

  function checkInput(e) {
    e.preventDefault();

    if (email === '') return setMensage('Informe o seu e-mail!');

    handleSubmit();
  };

  async function handleSubmit() {
    const res = await api.post('/sessions', { email });

    const { _id } = res.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return (
    <>
      <div className="containerLogin">
        <div className="content">
          <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
          </p>

          <form onSubmit={checkInput}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Seu e-mail no Github"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <button className="btnLogin" type="submit">Entrar</button>
          </form>
          
        </div>

        { mensage && (
          <div className="validation-container">
            <strong className="mensageError">{mensage}</strong>
            <button type="button" onClick={() => setMensage(null)}>FECHAR</button>
          </div>
        ) }
      </div>
    </>
  )
}