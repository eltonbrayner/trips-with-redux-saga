export const ADD_RESERVE_REQUEST = (id) => {
  return {
    type: 'ADD_RESERVE_REQUEST',
    id,
  };
};

export const ADD_RESERVE_SUCCESS = (trip) => {
  return {
    type: 'ADD_RESERVE_SUCCESS',
    trip,
  };
};

export function REMOVE_RESERVE(id) {
  return {
    type: 'REMOVE_RESERVE',
    id,
  };
}

export function UPDATE_RESERVE_REQUEST(id, amount) {
  return {
    type: 'UPDATE_RESERVE_REQUEST',
    id,
    amount,
  };
}

export function UPDATE_RESERVE_SUCCESS(id, amount) {
  return {
    type: 'UPDATE_RESERVE_SUCCESS',
    id,
    amount,
  };
}
