import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import './style.css';
import {
  REMOVE_RESERVE,
  UPDATE_RESERVE_REQUEST,
} from '../../store/modules/reserve/actions';

export default function Reservas() {
  const dispatch = useDispatch();
  const reserves = useSelector((state) => state.reserve);

  function handleRemove(id) {
    dispatch(REMOVE_RESERVE(id));
  }

  function decrementAmount(id, amount) {
    dispatch(UPDATE_RESERVE_REQUEST(id, amount - 1));
  }

  function incrementAmount(id, amount) {
    dispatch(UPDATE_RESERVE_REQUEST(id, amount + 1));
  }

  return (
    <div>
      <h1 className="title">Você solicitou {reserves.length} reservas</h1>

      {reserves?.map((el) => (
        <div className="reservas" key={el.id}>
          <img src={el.image} alt={el.title} />

          <strong>{el.title}</strong>
          <div id="amount">
            <button
              type="button"
              onClick={() => decrementAmount(el.id, el.amount)}
            >
              <MdRemoveCircle size={25} color="#191919" />
            </button>
            <input type="text" readOnly value={el.amount} />
            <button
              type="button"
              onClick={() => incrementAmount(el.id, el.amount)}
            >
              <MdAddCircle size={25} color="#191919" />
            </button>
          </div>
          <button type="button" onClick={() => handleRemove(el.id)}>
            <MdDelete size={20} color="#191919" />
          </button>
        </div>
      ))}

      <footer>
        <button type="button">Solicitar Reservas</button>
      </footer>
    </div>
  );
}
