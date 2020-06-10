import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

import './styles.css';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

export default function Spot ({ history }) {
  const [thumbnailStorage, setThumbnailStorage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [load, setLoad] = useState(false);
  const spot_id = history.location.pathname.split('/')
  const user_id = localStorage.getItem('user');
  
  let preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    if (spot_id[2]) {
      await api.put(`/spots/${spot_id[2]}`, data, {
        headers: { user_id }
      })
    } else {
      await api.post('/spots', data, {
        headers: { user_id }
      })      
    }

    history.push('/dashboard');
  }

  async function loadSpot() {
    if (load || !spot_id[2]) return;
    const res = await api.get(`/spots/${spot_id[2]}/edit`, {
      headers: { user_id }
    })

    const { thumbnail_url, company, price, techs } = res.data
   
    setThumbnailStorage(thumbnail_url)
    setCompany(company)
    setTechs(techs)
    setPrice(price)
    setLoad(true)      
  }
  
  loadSpot()

  if (!thumbnail && thumbnailStorage) {
    preview = thumbnailStorage
  }

  // console.log(company.length)

  return (
    <div className="containerDashboard">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={(thumbnail || thumbnailStorage) ? 'has-thumbnail' : ''}
          >
            <input 
              type="file" 
              onChange={event => setThumbnail(event.target.files[0])} />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="company">EMPRESA * <span>(Limite de carateres: {company.length}/18)</span></label>
          <input 
            id="company"
            maxLength='18'
            placeholder="Sua empresa incrível"
            value={company}
            onChange={event => setCompany(event.target.value)}
          />

          <label htmlFor="techs">TECNOLOGIAS * <span>(Separadas por vírgula. Limite de carateres: {techs.length}/40)</span></label>
          <input 
            id="techs"
            placeholder="Quais tecnologias usam?"
            value={techs}
            onChange={event => setTechs(event.target.value)}
          />

          <label htmlFor="price">VALOR DA DIÁRIA * <span>(Deixe em branco para GRATUITO.)</span></label>
          <InputMask 
            id="price"
            placeholder="Valor cobrado por dia"
            type="number"
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
