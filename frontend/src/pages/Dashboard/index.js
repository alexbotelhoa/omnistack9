import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => io('http://192.168.1.101:3333', {
        query: { user_id },
    }), [user_id]);
  
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

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

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(req => req._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(req => req._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(req => (
                <li key={req._id}>
                    <p>
                        <strong>{req.user.email}</strong> está solicitando uma reserva em <strong>{req.spot.company}</strong> para a data: <strong>{req.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(req._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(req._id)}>REJEITAR</button>
                </li>
                ))}
            </ul>
            
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