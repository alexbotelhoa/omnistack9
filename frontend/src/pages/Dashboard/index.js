import React, { useEffect, useState, useMemo } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import './styles.css';
import api from '../../services/api'

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const history = useHistory()
    const user_id = localStorage.getItem('user');
    
    const socket = useMemo(() => io('http://192.168.1.101:3333', {
        query: { user_id },
    }), [user_id]);
  
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {     
        async function loadSpots() {
            const res = await api.get('/dashboard', {
              headers: { user_id }
            })
      
            setSpots(res.data)
        }

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

    async function handleEditSpot(id) {
        try {
          await api.get(`/spots/${id}`, {
            headers: {
              Authorization: user_id
            }
          });
    
          setSpots(spots.filter(spot => spot.id !== id))
        } catch (err) {
          alert('Erro ao deletar o caso, tente novamente');
        }
    }

    async function handleDeleteSpot(id) {
        try {
          await api.delete(`/spots/${id}`, {
            headers: {
              Authorization: user_id
            }
          });
    
          setSpots(spots.filter(spot => spot.id !== id))
        } catch (err) {
          alert('Erro ao deletar o caso, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.getItem('user');
        localStorage.clear()
        
        history.push('/');
        window.location.reload(false)
    }

    return (
        <>
            <div className="containerDashboard">
                <div className="content">
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

                    { spots.length > 0 ? 
                        <ul className="spot-list">
                            {spots.map(spot => (
                                <li key={spot._id}>
                                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                                    <strong>{spot.company}</strong>
                                    <p>
                                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                                        <div>
                                            <Link to={`/spot/${spot._id}`}>
                                                <FiEdit2 size={20} color="#a8a8b3" />
                                            </Link>
                                            <button type="button" onClick={() => handleDeleteSpot(spot._id)}>
                                                <FiTrash2 size={20} color="#a8a8b3" />
                                            </button>
                                        </div>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    :
                        <div className="empty">Cadastre sua primeira sala</div>
                    }

                    <div className="btnNavegacao">
                        <Link to="/spot">
                            <button className="btn">Cadastrar nova sala</button>
                        </Link>
                        <Link to="/">
                            <button className="btn" onClick={handleLogout}>Fazer logout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}