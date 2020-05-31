import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

export default function New({ history }) {
  const [spots, setSpots] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const user_id = localStorage.getItem('user');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    // await api.post('/spots', data, {
    //   headers: { user_id }
    // })

    history.push('/dashboard');
  }

  async function loadSpots() {
    const { spot_id } = req.params

    const res = await api.get(`/spots/${spot_id}/edit`, {
      headers: { user_id }
    })

    setSpots(res.data)
  }

  loadSpots()

  return (
    <div className="containerDashboard">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input 
              type="file" 
              onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="company">EMPRESA *</label>
          <input 
            id="company"
            placeholder="Sua empresa incrível"
            value={company}
            onChange={event => setCompany(event.target.value)}
          />

          <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
          <input 
            id="techs"
            placeholder="Quais tecnologias usam?"
            value={techs}
            onChange={event => setTechs(event.target.value)}
          />

          <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
          <input 
            id="price"
            placeholder="Valor cobrado por dia"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />

          <div className="btnNavegacao">
              <button type="submit" className="btn">Salvar</button>
            <Link to="/dashboard">
              <button className="btn" onClick={() => {}}>Voltar</button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}
