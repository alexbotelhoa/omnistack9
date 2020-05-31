import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

export default function Spot ({ history }) {
  const [thumbnailStorage, setThumbnailStorage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const spot_id = history.location.pathname.split('/')
  const user_id = localStorage.getItem('user');
  
  let preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  // console.log(thumbnail)

  async function handleSubmit(e) {
    e.preventDefault();

    console.log('1', thumbnail)
    console.log('2', company)
    console.log('3', techs)
    console.log('4', price)

  // setThumbnail('http://192.168.1.101:3333/files/tartaruga-1590963797789.jpg')

    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    // console.log('data', data)

    if (!spot_id[2]) {
      console.log('API post')
      await api.post('/spots', data, {
        headers: { user_id }
      })
    } else {
      console.log('API put')
      await api.put(`/spots/${spot_id[2]}`, data, {
        headers: { user_id }
      })
    }

    history.push('/dashboard');
  }

  useEffect(() => {
    async function loadSpot(spot_id) {
      const res = await api.get(`/spots/${spot_id}/edit`, {
        headers: { user_id }
      })

      const { thumbnail_url, thumbnail, company, price, techs } = res.data
     
      setThumbnailStorage(thumbnail_url)
      setCompany(company)
      setTechs(techs)
      setPrice(price)
    }

    loadSpot(spot_id[2])
  }, []);

  if (!thumbnail && thumbnailStorage) {
    preview = thumbnailStorage
  }

  console.log('thumbnailStorage', thumbnailStorage)
  console.log('thumbnail', thumbnail)
  console.log('preview', preview)

  // setThumbnail('http://192.168.1.101:3333/files/tartaruga-1590963797789.jpg')

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
