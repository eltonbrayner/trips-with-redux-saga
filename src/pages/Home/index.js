import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { MdFlightTakeoff } from 'react-icons/md';
import './style.css';
import { ADD_RESERVE_REQUEST } from '../../store/modules/reserve/actions';

export default function Home() {
  const dispatch = useDispatch();
  const [trips, setTrips] = React.useState([]);

  React.useEffect(() => {
    async function loadApi() {
      const response = await api.get('trips');
      setTrips(response.data);
    }

    loadApi();
  }, []);

  function handleAdd(id) {
    dispatch(ADD_RESERVE_REQUEST(id));
  }

  return (
    <div>
      <div className="box">
        {trips.map((el) => (
          <li key={el.id}>
            <img src={el.image} alt={el.title} />
            <strong>{el.title}</strong>
            <span>Status: {el.status ? 'Disponivel' : 'Sem vagas'}</span>
            <button type="button" onClick={() => handleAdd(el.id)}>
              <div>
                <MdFlightTakeoff size={16} color="#FFF" />
              </div>
              <span>Solicitar Reserva</span>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
