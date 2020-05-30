import React, { useState } from 'react';

import './styles.css';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

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

          <form onSubmit={handleSubmit}>
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
      </div>
    </>
  )
}