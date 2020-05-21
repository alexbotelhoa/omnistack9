import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'

import './styles.css';
import api from '../../services/api'

export default function Dashboard() {
    const [spots, setSpots] = useState([])

    async function loadSpots() {
        const user_id = localStorage.getItem('user')
        const res = await api.get('/dashboard', {
          headers: { user_id }
        })
  
        setSpots(res.data)
    }




    useEffect(() => {     
        loadSpots()
      }, [])


    return (
        <>
            {/* <ul className="notifications">
                {requests.map(request => (
                <li key={request._id}>
                    <p>
                    <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
                ))}
            </ul> */}
            
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}