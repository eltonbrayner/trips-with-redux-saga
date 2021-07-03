import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { ADD_RESERVE_SUCCESS, UPDATE_RESERVE_SUCCESS } from './actions';

function* addToReserve({ id }) {
  const tripExists = yield select((state) =>
    state.reserve.find((trip) => trip.id === id),
  );

  const myStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  const currentStock = tripExists ? tripExists.amount : 0;

  const amount = currentStock + 1;

  if (amount > stockAmount) {
    alert('Quantidade máxima atingida');
    return;
  }

  if (tripExists) {
    //Aumentar o amount
    const amount = tripExists.amount + 1;
    yield put(UPDATE_RESERVE_SUCCESS(id, amount));
  } else {
    const response = yield call(api.get, `trips/${id}`);

    const data = {
      ...response.data,
      amount: 1,
    };

    yield put(ADD_RESERVE_SUCCESS(data)); //Disparando ACTION para o REDUCER
    history.push('/Reservas');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const myStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  if (amount > stockAmount) {
    alert('Quantidade máxima atingida');
    return;
  }

  yield put(UPDATE_RESERVE_SUCCESS(id, amount));
}

//TakeLastest é parecido como um debounce (várias solicitações em seguida só funciona uma)
//TakeEvery ele captura todas as requisições realizadas (vários clicks, várias requisições)
export default all([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
]);
